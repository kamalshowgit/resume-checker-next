import axios, { AxiosInstance, AxiosResponse } from 'axios';

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
  requiresPayment?: boolean;
  deviceId?: string;
  analysisCount?: number;
}

export interface ChatResponse {
  success: boolean;
  response?: string;
  reply?: string;
  error?: string;
}

export interface PaymentResponse {
  success: boolean;  
  orderId?: string;
  paymentUrl?: string;
  error?: string;
}

export interface ServerStatusResponse {
  status: 'online' | 'offline' | 'checking';
  timestamp: string;
  error?: string;
}

// API Service class
class APIService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
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
      
      // For development, create a mock response if needed
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('Using mock resume analysis response');
      //   return this.getMockResumeAnalysis();
      // }
      
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
            timeout: 60000, // Increase timeout for file uploads
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
        
        // Only use mock data if explicitly requested for testing
        // if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        //   console.log('Using mock resume analysis response after server error');
        //   return this.getMockResumeAnalysis();
        // }
        
        throw uploadError; // Re-throw to be handled by outer catch
      }
      
      // This code is now unreachable due to the changes above
      // Keeping it for reference in case we need to revert
      /*
      return {
        success: response.data.success || true,
        resumeId: response.data.resumeId,
        content: response.data.content,
        filename: response.data.filename,
        fileType: response.data.fileType,
        fileSize: response.data.fileSize,
        atsScore: response.data.atsScore,
        atsBreakdown: response.data.atsBreakdown,
        atsSuggestions: response.data.atsSuggestions,
        keyPoints: response.data.keyPoints,
        message: response.data.message,
        processingDetails: response.data.processingDetails,
        error: response.data.error,
      };
      */
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

  // Get mock resume analysis response
  private getMockResumeAnalysis(): ResumeAnalysisResponse {
    return {
      success: true,
      resumeId: 'mock-resume-' + Date.now(),
      content: `John Doe\nSenior Software Engineer\n\njohndoe@example.com | (555) 123-4567 | linkedin.com/in/johndoe\n\nSUMMARY\nExperienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading development teams.\n\nEXPERIENCE\nSenior Software Engineer | Tech Solutions Inc. | 2020 - Present\n- Led development of a customer-facing portal that increased user engagement by 45%\n- Architected microservices infrastructure that reduced system latency by 30%\n- Mentored junior developers and implemented code review processes\n\nSoftware Engineer | InnovateTech | 2017 - 2020\n- Developed RESTful APIs serving 2M+ daily requests\n- Implemented CI/CD pipeline reducing deployment time by 60%\n- Collaborated with product team to optimize user experience\n\nSKILLS\nLanguages: JavaScript, TypeScript, Python, SQL\nFrontend: React, Redux, HTML5, CSS3, Tailwind\nBackend: Node.js, Express, Django, GraphQL\nCloud: AWS, Docker, Kubernetes, CI/CD\nTools: Git, JIRA, Figma, Jest`,
      filename: 'resume.pdf',
      fileType: 'application/pdf',
      fileSize: 128000,
      atsScore: 78,
      keyPoints: [
        'Senior Software Engineer with 8+ years of experience',
        'Expertise in React, Node.js, and cloud technologies',
        'Increased user engagement by 45% through portal development',
        'Reduced system latency by 30% using microservices',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ],
      atsBreakdown: {
        relevance: 80,
        formatting: 85,
        keywords: 75,
        experience: 82,
        skills: 78
      },
      atsSuggestions: {
        summary: 'Add more industry-specific keywords',
        experience: 'Quantify achievements with more metrics',
        skills: 'Include more specialized technical skills'
      },
      improvedContent: {
        4: 'Experienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering high-performance, scalable applications and leading cross-functional development teams.',
        12: '- Led development of a customer-facing portal that increased user engagement by 45% and reduced customer support inquiries by 32%',
        13: '- Architected and implemented microservices infrastructure that reduced system latency by 30% and improved system reliability by 25%'
      }
    };
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

  // Payment processing
  async createPayment(amount: number, currency: string = 'INR'): Promise<PaymentResponse> {
    try {
      const response: AxiosResponse<PaymentResponse> = await this.api.post('/api/pay/create-order', {
        amount,
        currency,
      });
      return response.data;
    } catch (error: unknown) {
      console.error('Payment creation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create payment';
      const responseError = (error as { response?: { data?: { error?: string } } })?.response?.data?.error;
      return {
        success: false,
        error: responseError || errorMessage,
      };
    }
  }

  // Verify payment
  async verifyPayment(paymentId: string, orderId: string): Promise<PaymentResponse> {
    try {
      const response: AxiosResponse<PaymentResponse> = await this.api.post('/api/pay/verify', {
        paymentId,
        orderId,
      });
      return response.data;
    } catch (error: unknown) {
      console.error('Payment verification failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify payment';
      const responseError = (error as { response?: { data?: { error?: string } } })?.response?.data?.error;
      return {
        success: false,
        error: responseError || errorMessage,
      };
    }
  }

  // Get enhanced mock chat response with context awareness
  private getEnhancedMockChatResponse(query: string, resumeData?: Record<string, unknown>): ChatResponse {
    const lowerQuery = query.toLowerCase();
    const resumeDataObj = (resumeData?.resumeData as Record<string, unknown>) || {};
    const resumeContent = resumeDataObj.content as string || '';
    const resumeFileName = resumeDataObj.filename as string || 'your resume';
    const atsScore = resumeDataObj.atsScore as number || 0;
    const hasResumeData = !!resumeContent;
    
    // Detect greeting or introduction
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi ') || lowerQuery === 'hi' || lowerQuery.includes('hey')) {
      if (hasResumeData) {
        return {
          success: true,
          response: `Hello! I've analyzed your resume "${resumeFileName}" and I'm here to help you improve it. Your current ATS score is ${atsScore}%. What specific aspect would you like help with? Your summary, work experience, skills, or something else?`
        };
      } else {
        return {
          success: true,
          response: "Hello! I'm your AI Career Advisor. I can help you optimize your resume and provide career guidance. Upload your resume to get personalized advice, or feel free to ask me general career questions."
        };
      }
    }
    
    // Handle specific resume section questions
    if (hasResumeData) {
      // Extract relevant sections from resume content
      const sections = {
        summary: this.extractSection(resumeContent, ['summary', 'profile', 'objective']),
        experience: this.extractSection(resumeContent, ['experience', 'work', 'employment']),
        skills: this.extractSection(resumeContent, ['skills', 'technologies', 'competencies']),
        education: this.extractSection(resumeContent, ['education', 'academic', 'degree']),
        projects: this.extractSection(resumeContent, ['projects', 'portfolio']),
      };
      
      // Respond based on query and resume content
      if (lowerQuery.includes('summary') || lowerQuery.includes('profile') || lowerQuery.includes('objective')) {
        const hasSummary = sections.summary.length > 0;
        if (hasSummary) {
          return {
            success: true,
            response: `I see your summary section: "${sections.summary.substring(0, 100)}${sections.summary.length > 100 ? '...' : ''}"\n\nTo strengthen it, try to:\n\n1. Add more quantifiable achievements\n2. Highlight your unique value proposition\n3. Include 2-3 relevant industry keywords\n4. Keep it concise (3-5 lines)\n\nWould you like me to suggest specific improvements?`
          };
        } else {
          return {
            success: true,
            response: "I don't see a clear summary section in your resume. A strong professional summary is crucial for making a good first impression. Consider adding a 3-5 line summary that highlights your experience, key achievements, and career goals. Would you like me to help you draft one?"
          };
        }
      } else if (lowerQuery.includes('experience') || lowerQuery.includes('work')) {
        return {
          success: true,
          response: `Your work experience section is well-structured. I particularly like that you've included specific roles and companies. To make it even stronger:\n\n1. Add more quantifiable achievements (numbers, percentages, metrics)\n2. Use strong action verbs at the beginning of each bullet point\n3. Highlight results, not just responsibilities\n4. Tailor your experience to match job descriptions\n\nFor example, instead of "Developed web applications," try "Developed 5 responsive web applications that increased user engagement by 40%."`
        };
      } else if (lowerQuery.includes('skill')) {
        return {
          success: true,
          response: `I see you've listed skills including ${this.extractSkills(resumeContent).join(', ')}. Here's how to improve this section:\n\n1. Group skills by category (Technical, Soft, Tools)\n2. List most relevant skills first\n3. Match skills to the job descriptions you're targeting\n4. Consider adding proficiency levels for technical skills\n5. Remove outdated or irrelevant skills\n\nWhat industry are you targeting? I can suggest specific skills to emphasize.`
        };
      } else if (lowerQuery.includes('education')) {
        return {
          success: true,
          response: "Your education section is clear and well-formatted. Consider these enhancements:\n\n1. List relevant coursework if you're early in your career\n2. Include GPA if it's 3.5 or higher\n3. Add academic achievements or honors\n4. Include relevant certifications\n\nKeep education brief if you have extensive work experience, as employers will focus more on your professional achievements."
        };
      } else if (lowerQuery.includes('ats') || lowerQuery.includes('score')) {
        return {
          success: true,
          response: `Your current ATS score is ${atsScore}%. ${atsScore < 70 ? "This could be improved." : atsScore < 85 ? "This is good, but could be better." : "This is excellent!"}\n\nTo improve your ATS compatibility:\n\n1. Include relevant keywords from job descriptions\n2. Use standard section headings (Experience, Skills, Education)\n3. Avoid complex formatting, tables, or graphics\n4. Use a clean, simple layout\n5. Spell out acronyms at least once\n\nWould you like me to suggest specific keywords for your industry?`
        };
      }
    }
    
    // Default responses based on query
    const responses: Record<string, string> = {
      default: "I can help you improve your resume and provide career advice. What specific aspect of your resume would you like help with?",
      summary: "A strong professional summary should highlight your experience level, key skills, and career achievements in 3-5 concise sentences. It should immediately grab the reader's attention and make them want to read more.",
      experience: "When describing your work experience, focus on achievements rather than responsibilities. Use action verbs, include metrics when possible, and tailor your experience to match the job you're applying for.",
      skills: "For your skills section, include a mix of technical skills, soft skills, and industry-specific knowledge. Organize them by category and prioritize those most relevant to your target roles.",
      education: "Your education section should be concise and include degree names, institutions, graduation dates, and relevant honors. Recent graduates can include relevant coursework, while experienced professionals should keep this section brief.",
      ats: "ATS (Applicant Tracking Systems) scan resumes for keywords and proper formatting. To improve your ATS score, use industry-standard section headings, include relevant keywords, and avoid complex formatting or graphics.",
      keywords: "Good keywords to include depend on your industry. Generally, include a mix of hard skills (technical abilities), soft skills (communication, leadership), industry-specific terms, and action verbs that demonstrate your impact.",
      format: "The best resume format depends on your experience level and career path. Chronological format works well for those with steady career progression, while functional or combination formats can highlight skills over experience for career changers or those with gaps.",
      length: "For most professionals, a 1-2 page resume is ideal. Entry-level candidates should aim for one page, while those with 10+ years of experience might need two pages to showcase relevant experience.",
      projects: "Including relevant projects can strengthen your resume, especially if you're early in your career or changing fields. Focus on projects that demonstrate skills relevant to your target roles and quantify results when possible."
    };
    
    // Simple keyword matching for general queries
    let response = responses.default;
    
    if (lowerQuery.includes('summary')) {
      response = responses.summary;
    } else if (lowerQuery.includes('experience')) {
      response = responses.experience;
    } else if (lowerQuery.includes('skill')) {
      response = responses.skills;
    } else if (lowerQuery.includes('education')) {
      response = responses.education;
    } else if (lowerQuery.includes('ats')) {
      response = responses.ats;
    } else if (lowerQuery.includes('keyword')) {
      response = responses.keywords;
    } else if (lowerQuery.includes('format')) {
      response = responses.format;
    } else if (lowerQuery.includes('length') || lowerQuery.includes('page')) {
      response = responses.length;
    } else if (lowerQuery.includes('project')) {
      response = responses.projects;
    }
    
    return {
      success: true,
      response: response
    };
  }
  
  // Helper function to extract relevant section from resume content
  private extractSection(content: string, keywords: string[]): string {
    if (!content) return '';
    
    const lines = content.split('\n');
    let inSection = false;
    let sectionContent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      
      // Check if this line contains a section header
      const isSectionHeader = keywords.some(keyword => line.includes(keyword));
      
      if (isSectionHeader) {
        inSection = true;
        sectionContent = lines[i] + '\n';
      } else if (inSection) {
        // Check if we've reached the next section
        if (line.trim() === '' || (line.toUpperCase() === line && line.trim() !== '')) {
          // Empty line or all caps line might indicate a new section
          if (i < lines.length - 1 && lines[i+1].trim() !== '' && 
              !keywords.some(keyword => lines[i+1].toLowerCase().includes(keyword))) {
            break;
          }
        }
        sectionContent += lines[i] + '\n';
      }
    }
    
    return sectionContent.trim();
  }
  
  // Helper function to extract skills from resume content
  private extractSkills(content: string): string[] {
    if (!content) return [];
    
    const commonSkills = [
      'javascript', 'python', 'java', 'c++', 'react', 'angular', 'vue', 'node', 
      'express', 'django', 'flask', 'sql', 'nosql', 'mongodb', 'postgresql', 
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'git', 'agile', 
      'scrum', 'leadership', 'communication', 'project management', 'problem solving'
    ];
    
    const skills: string[] = [];
    const lowerContent = content.toLowerCase();
    
    for (const skill of commonSkills) {
      if (lowerContent.includes(skill)) {
        skills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
      }
    }
    
    return skills.length > 0 ? skills.slice(0, 5) : ['technical skills', 'communication', 'problem solving'];
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
}

// Export singleton instance
export const apiService = new APIService();
export default apiService;
