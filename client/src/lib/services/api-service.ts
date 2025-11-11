import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getApiUrl, isProductionConfigured } from '../config';

// =====================
// API Response Types
// =====================
export interface ResumeAnalysisResponse {
  success: boolean;
  resumeId?: string;
  content?: string;
  filename?: string;
  fileType?: string;
  fileSize?: number;
  atsScore?: number;
  atsBreakdown?: Record<string, unknown>;
  atsSuggestions?: Record<string, unknown>;
  keyPoints?: string[];
  improvedContent?: Record<string, string>;
  lineByLineSuggestions?: Record<
    string,
    {
      improvedText: string;
      suggestions: string[];
      explanation: string;
    }
  >;
  jobProfiles?: Array<{
    title: string;
    matchScore: number;
    reasoning: string;
  }>;
  message?: string;
  processingDetails?: Record<string, unknown>;
  error?: string;
  details?: string;
  analysisStatus?: 'partial' | 'complete';
  analysisNote?: string;
  serverStatus?: 'online' | 'offline' | 'error';
}

export interface ChatResponse {
  success: boolean;
  response?: string;
  reply?: string;
  error?: string;
}

export interface ServerStatusResponse {
  status: 'online' | 'offline' | 'checking';
  timestamp: string;
  error?: string;
}

export interface DebugDataResponse {
  success: boolean;
  status: string;
  database: string;
  stats: {
    totalResumes: number;
    recentUploads: number;
  };
  recentResumes: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }>;
  timestamp: string;
  environment: string;
}

export interface AdminStatsResponse {
  success: boolean;
  data: {
    database: {
      totalResumes: number;
      recentUploads: number;
      storageUsed: string;
      lastBackup: string;
    };
    features: Array<{
      name: string;
      enabled: boolean;
      requestsToday: number;
      requestsThisHour: number;
    }>;
    models: Array<{
      name: string;
      provider: string;
      quality: string;
      speed: string;
      costPer1kTokens: number;
    }>;
    recentActivity: Array<{
      id: number;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    }>;
  };
  userRole: string;
}

export interface DatabaseBackupResponse {
  success: boolean;
  data: {
    totalRecords: number;
    backup: Array<any>;
    timestamp: string;
    environment: string;
  };
}

// =====================
// API Service Class
// =====================
class APIService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = getApiUrl();

    if (!isProductionConfigured()) {
      console.warn('⚠️ Production URLs not configured. Please set NEXT_PUBLIC_API_URL and NEXT_PUBLIC_APP_URL.');
      console.warn('Current API URL:', this.baseURL);
    } else {
      console.log('✅ Production configuration detected. API URL:', this.baseURL);
    }

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 45000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // =====================
  // Health Check
  // =====================
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.api.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  // =====================
  // Resume Analysis
  // =====================
  async analyzeResume(formData: FormData): Promise<ResumeAnalysisResponse> {
    try {
      const file = formData.get('file');
      if (!file) {
        return { success: false, error: 'No file provided for analysis' };
      }

      const uploadEndpoint = '/api/resume/upload';
      console.log(`Sending request to: ${this.baseURL}${uploadEndpoint}`);

      const response: AxiosResponse<ResumeAnalysisResponse> = await this.api.post(uploadEndpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 45000,
      });

      if (!response.data.success) {
        return { success: false, error: response.data.error || 'Server returned an error' };
      }

      return response.data;
    } catch (error: any) {
      console.error('Resume analysis failed:', error);

      const validStatuses = ['online', 'offline', 'error'] as const;
      const rawStatus = error?.response?.data?.serverStatus;
      const serverStatus: 'online' | 'offline' | 'error' =
        error?.response?.status === 503
          ? 'offline'
          : validStatuses.includes(rawStatus)
          ? (rawStatus as 'online' | 'offline' | 'error')
          : 'error';

      return {
        success: false,
        error: error?.response?.data?.error || error.message || 'Failed to analyze resume',
        details: error?.response?.data?.details,
        serverStatus,
      };
    }
  }

  // =====================
  // Chat with AI
  // =====================
  async chatWithAI(query: string, resumeData?: Record<string, unknown>): Promise<ChatResponse> {
    try {
      const requestData = {
        message: query,
        history: (resumeData?.history as Array<{ role: string; content: string }>) || [],
        context: resumeData?.context || {},
      };

      const response: AxiosResponse<ChatResponse> = await this.api.post('/api/resume/chat', requestData);

      return {
        success: true,
        response: response.data.reply || response.data.response || 'No response received',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error?.response?.data?.error || error.message || 'Chat request failed',
      };
    }
  }

  // =====================
  // Server Status
  // =====================
  async getServerStatus(): Promise<ServerStatusResponse> {
    try {
      await this.api.get('/health');
      await this.api.get('/api/resume/health');
      return { status: 'online', timestamp: new Date().toISOString() };
    } catch (error: any) {
      return {
        status: 'offline',
        timestamp: new Date().toISOString(),
        error: error.message || 'Server status check failed',
      };
    }
  }

  // =====================
  // Debug / Admin APIs
  // =====================
  async getDebugData(): Promise<DebugDataResponse> {
    const response = await this.api.get('/debug-data');
    return response.data;
  }

  async getAdminStats(apiKey: string): Promise<AdminStatsResponse> {
    const response = await this.api.get('/api/admin/stats', {
      headers: { 'x-demo-key': apiKey },
    });
    return response.data;
  }

  async getDatabaseBackup(apiKey: string): Promise<DatabaseBackupResponse> {
    const response = await this.api.get('/api/admin/backup', {
      headers: { 'x-demo-key': apiKey },
    });
    return response.data;
  }

  async getDatabaseHealth(apiKey: string): Promise<any> {
    const response = await this.api.get('/api/admin/db-health', {
      headers: { 'x-demo-key': apiKey },
    });
    return response.data;
  }

  // =====================
  // Secure Admin Methods
  // =====================
  async getAllDataSecure(adminId: string, adminPassword: string): Promise<any> {
    const response = await this.api.get('/api/admin/secure/all-data', {
      headers: {
        'x-admin-id': adminId,
        'x-admin-password': adminPassword,
      },
    });
    return response.data;
  }

  async exportCSVSecure(adminId: string, adminPassword: string): Promise<Blob> {
    const response = await this.api.get('/api/admin/secure/export-csv', {
      headers: {
        'x-admin-id': adminId,
        'x-admin-password': adminPassword,
      },
      responseType: 'blob',
    });
    return response.data;
  }

  async getSecureStats(adminId: string, adminPassword: string): Promise<any> {
    const response = await this.api.get('/api/admin/secure/stats', {
      headers: {
        'x-admin-id': adminId,
        'x-admin-password': adminPassword,
      },
    });
    return response.data;
  }
}

// =====================
// Export Singleton
// =====================
export const apiService = new APIService();
export default apiService;
