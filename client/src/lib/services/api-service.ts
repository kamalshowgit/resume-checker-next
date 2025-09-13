import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getApiUrl, isProductionConfigured } from '../config';

// API Response types
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
  jobProfiles?: Array<{
    title: string;
    matchScore: number;
    reasoning: string;
  }>;
  message?: string;
  processingDetails?: Record<string, unknown>;
  error?: string;
  analysisStatus?: 'partial' | 'complete';
  analysisNote?: string;
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

// API Service class
class APIService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = getApiUrl();
    
    // Log configuration status
    if (!isProductionConfigured()) {
      console.warn('⚠️  Production URLs not configured. Please set NEXT_PUBLIC_API_URL and NEXT_PUBLIC_APP_URL environment variables.');
      console.warn('Current API URL:', this.baseURL);
    } else {
      console.log('✅ Production configuration detected. API URL:', this.baseURL);
    }
    
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 45000, // Reduced from 60s to 45s for better UX
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
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

    // Add response interceptor for logging
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

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.api.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  // Resume analysis
  async analyzeResume(formData: FormData): Promise<ResumeAnalysisResponse> {
    try {
      console.log('Analyzing resume with file:', formData.get('file'));
      
      // Check if file exists in formData
      const file = formData.get('file');
      if (!file) {
        console.error('No file found in formData');
        return {
          success: false,
          error: 'No file provided for analysis'
        };
      }
      
      // Log the file details
      if (file instanceof File) {
        console.log('File details:', {
          name: file.name,
          type: file.type,
          size: file.size
        });
      }
      
      // Check server endpoint URL - the server route is '/upload' under the resume router
      // The full path is /api/resume/upload on the server
      const uploadEndpoint = '/api/resume/upload';
      console.log(`Sending request to: ${this.baseURL}${uploadEndpoint}`);
      
      try {
        const response: AxiosResponse<ResumeAnalysisResponse> = await this.api.post(
          uploadEndpoint,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            timeout: 45000, // Reduced from 60s to 45s for better UX
          }
        );
        
        console.log('Server response:', response.data);
        
        // If we get here, server responded but we might still have an error in the response
        if (!response.data.success) {
          console.error('Server returned error:', response.data.error);
          return {
            success: false,
            error: response.data.error || 'Server returned an error'
          };
        }
        
        return response.data;
      } catch (uploadError) {
        console.error('Upload request failed:', uploadError);
        
        // Don't use mock data anymore, let the error propagate
        console.error('Server error occurred during file upload');
        
        throw uploadError; // Re-throw to be handled by outer catch
      }
    } catch (error: unknown) {
      console.error('Resume analysis failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze resume';
      const responseError = (error as { response?: { data?: { error?: string } } })?.response?.data?.error;
      return {
        success: false,
        error: responseError || errorMessage,
      };
    }
  }

  // Chat with AI
  async chatWithAI(query: string, resumeData?: Record<string, unknown>): Promise<ChatResponse> {
    try {
      // Prepare the request data with context
      const requestData = {
        message: query,
        history: (resumeData?.history as Array<{ role: string; content: string }>) || [],
        context: resumeData?.context || {}
      };
      
      // Log the request for debugging
      console.log('Chat request:', { 
        query, 
        historyLength: requestData.history.length,
        hasResumeData: !!resumeData?.resumeData
      });
      
      // Always use real AI - no mock data fallback
      console.log('Using real AI chat service');
      
      const response: AxiosResponse<ChatResponse> = await this.api.post('/api/resume/chat', requestData);
      
      // Transform backend response to match frontend interface
      return {
        success: true,
        response: response.data.reply || response.data.response || 'No response received',
      };
    } catch (error: unknown) {
      console.error('Chat failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get chat response';
      const responseError = (error as { response?: { data?: { error?: string } } })?.response?.data?.error;
      
      // Never use mock data - always require real AI responses
      console.log('Chat service failed - no mock data fallback');
      
      return {
        success: false,
        error: responseError || errorMessage,
      };
    }
  }

  // Get server status
  async getServerStatus(): Promise<ServerStatusResponse> {
    // Always check real server status - no mock data
    
    try {
      await this.api.get('/health');
      return {
        status: 'online',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'offline',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Get debug data (public endpoint - no auth required)
  async getDebugData(): Promise<DebugDataResponse> {
    try {
      const response = await this.api.get('/debug-data');
      return response.data;
    } catch (error) {
      console.error('Failed to get debug data:', error);
      throw error;
    }
  }

  // Get admin statistics (requires authentication)
  async getAdminStats(apiKey: string): Promise<AdminStatsResponse> {
    try {
      const response = await this.api.get('/api/admin/stats', {
        headers: {
          'x-demo-key': apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get admin stats:', error);
      throw error;
    }
  }

  // Get database backup (requires authentication)
  async getDatabaseBackup(apiKey: string): Promise<DatabaseBackupResponse> {
    try {
      const response = await this.api.get('/api/admin/backup', {
        headers: {
          'x-demo-key': apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get database backup:', error);
      throw error;
    }
  }

  // Get database health (requires authentication)
  async getDatabaseHealth(apiKey: string): Promise<any> {
    try {
      const response = await this.api.get('/api/admin/db-health', {
        headers: {
          'x-demo-key': apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get database health:', error);
      throw error;
    }
  }

  // SECURE ADMIN METHODS - Require ID/Password authentication

  // Get all data with secure authentication
  async getAllDataSecure(adminId: string, adminPassword: string): Promise<any> {
    try {
      const response = await this.api.get('/api/admin/secure/all-data', {
        headers: {
          'x-admin-id': adminId,
          'x-admin-password': adminPassword
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get all data:', error);
      throw error;
    }
  }

  // Get CSV export with secure authentication
  async exportCSVSecure(adminId: string, adminPassword: string): Promise<Blob> {
    try {
      const response = await this.api.get('/api/admin/secure/export-csv', {
        headers: {
          'x-admin-id': adminId,
          'x-admin-password': adminPassword
        },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Failed to export CSV:', error);
      throw error;
    }
  }

  // Get secure statistics
  async getSecureStats(adminId: string, adminPassword: string): Promise<any> {
    try {
      const response = await this.api.get('/api/admin/secure/stats', {
        headers: {
          'x-admin-id': adminId,
          'x-admin-password': adminPassword
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get secure stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const apiService = new APIService();
export default apiService;
