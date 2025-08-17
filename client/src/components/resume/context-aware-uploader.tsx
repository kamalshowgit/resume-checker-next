"use client";

import React, { useState, useCallback, useRef } from "react";
import { FiUpload, FiFileText, FiCheckCircle, FiAlertCircle, FiInfo, FiTarget } from "react-icons/fi";
import { useResumeContext } from "../../lib/context/resume-context";
import { apiService } from "../../lib/services/api-service";
import { PaymentModal } from "./payment-modal";
import { getDeviceId } from "../../lib/utils/device-id";
import { AnalysisStatus } from "./analysis-status";

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
}

interface PaymentState {
  showPaymentModal: boolean;
  deviceId: string;
  analysisCount: number;
}

interface AnalysisState {
  status: 'partial' | 'complete';
  note?: string;
}

const ContextAwareUploader: React.FC = () => {
  const { state, actions } = useResumeContext();
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: "",
    success: false,
  });

  const [uploadSteps, setUploadSteps] = useState<{
    current: string;
    steps: Array<{ id: string; name: string; status: 'pending' | 'active' | 'completed' | 'failed' }>;
  }>({
    current: 'idle',
    steps: [
      { id: 'upload', name: 'File Upload', status: 'pending' },
      { id: 'extraction', name: 'Text Extraction', status: 'pending' },
      { id: 'fast-analysis', name: 'Fast Analysis', status: 'pending' },
      { id: 'ai-analysis', name: 'AI Processing', status: 'pending' },
      { id: 'content-improvement', name: 'Content Enhancement', status: 'pending' },
      { id: 'final-report', name: 'Report Generation', status: 'pending' }
    ]
  });

  const updateUploadStep = (stepId: string, status: 'pending' | 'active' | 'completed' | 'failed') => {
    setUploadSteps(prev => ({
      ...prev,
      current: stepId,
      steps: prev.steps.map(step => 
        step.id === stepId 
          ? { ...step, status }
          : step.status === 'active' 
            ? { ...step, status: 'pending' }
            : step
      )
    }));
  };

  const [dragActive, setDragActive] = useState(false);
  const [paymentState, setPaymentState] = useState<PaymentState>({
    showPaymentModal: false,
    deviceId: '',
    analysisCount: 0,
  });

  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    status: 'complete',
    note: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check payment status before allowing analysis
  const checkPaymentStatus = async (): Promise<boolean> => {
    try {
      // Check if user has already analyzed a resume (repeat user)
      if (state.resumeData && state.resumeData.resumeId) {
        // Generate device ID
        const deviceId = getDeviceId();
        
        // Check payment status from server
        const response = await apiService.checkPaymentStatus(deviceId);
        
        if (response.requiresPayment) {
          // Show payment modal
          setPaymentState({
            showPaymentModal: true,
            deviceId,
            analysisCount: response.analysisCount || 1,
          });
          return false; // Payment required
        }
      }
      return true; // No payment required
    } catch (error) {
      console.error('Payment status check failed:', error);
      // Allow analysis to continue if payment check fails
      return true;
    }
  };

  // Generate context-aware upload guidance
  const getUploadGuidance = () => {
    if (state.resumeData) {
      const score = state.resumeData.atsScore || 0;
      if (score < 70) {
        return {
          title: "Ready for an upgrade?",
          message: "Your current resume has room for improvement. Upload a new version to get better ATS scores and more job matches.",
          icon: <FiTarget className="h-5 w-5 text-orange-500" />,
          color: "text-orange-600 dark:text-orange-400",
        };
      } else if (score >= 85) {
        return {
          title: "Keep the momentum going!",
          message: "Your resume is performing well! Consider uploading an updated version to maintain your competitive edge.",
          icon: <FiCheckCircle className="h-5 w-5 text-green-500" />,
          color: "text-green-600 dark:text-green-400",
        };
      } else {
        return {
          title: "Almost there!",
          message: "Your resume is good but could be great. Upload an improved version to boost your ATS score.",
          icon: <FiInfo className="h-5 w-5 text-blue-500" />,
          color: "text-blue-600 dark:text-blue-400",
        };
      }
    }

    return {
      title: "Start your journey",
      message: "Upload your resume to get personalized analysis, ATS optimization tips, and job recommendations.",
      icon: <FiFileText className="h-5 w-5 text-blue-500" />,
      color: "text-blue-600 dark:text-blue-400",
    };
  };

  // Generate context-aware file requirements
  const getFileRequirements = () => {
    const requirements = [
      "PDF, DOC, or DOCX format",
      "Maximum 5MB file size",
      "Clear, readable text",
    ];

    if (state.resumeData) {
      const score = state.resumeData.atsScore || 0;
      if (score < 70) {
        requirements.push("Include quantifiable achievements");
        requirements.push("Add relevant keywords for your industry");
      }
      if (state.resumeData.keyPoints && state.resumeData.keyPoints.length < 5) {
        requirements.push("Include 5+ key accomplishments");
      }
    }

    return requirements;
  };

  // Generate context-aware tips
  const getContextTips = (): string[] => {
    const tips: string[] = [];

    if (state.resumeData) {
      const score = state.resumeData.atsScore || 0;
      const keyPointsCount = state.resumeData.keyPoints?.length || 0;

      if (score < 70) {
        tips.push("Focus on industry-specific keywords");
        tips.push("Add metrics and quantifiable results");
        tips.push("Ensure proper formatting and structure");
      }

      if (keyPointsCount < 5) {
        tips.push("Include specific achievements with numbers");
        tips.push("Add impact statements for each role");
      }

      if (state.resumeData.analysis?.suggestions?.skills) {
        tips.push("Update skills section based on job requirements");
      }
    } else {
      tips.push("Use clear, professional language");
      tips.push("Include relevant keywords for your target roles");
      tips.push("Quantify your achievements where possible");
    }

    return tips;
  };

  // Map backend suggestions to frontend format
  const mapSuggestions = (atsSuggestions: any): {
    summary: string;
    workExperience: string;
    skills: string;
    education: string;
    achievements: string;
    contactInfo: string;
    certifications: string;
    languages: string;
    projects: string;
    volunteerWork: string;
  } => {
    if (!atsSuggestions || !Array.isArray(atsSuggestions)) {
      return {
        summary: 'Add a concise professional summary highlighting your key strengths.',
        workExperience: 'Include quantifiable achievements in your work experience.',
        skills: 'Add more industry-specific technical and soft skills.',
        education: 'Format education section consistently with degrees and dates.',
        achievements: 'Add measurable achievements with specific metrics.',
        contactInfo: 'Ensure contact information is complete and professional.',
        certifications: 'Add relevant professional certifications and training.',
        languages: 'Include language proficiencies if relevant to the role.',
        projects: 'Highlight key projects with measurable outcomes.',
        volunteerWork: 'Include volunteer experience that demonstrates relevant skills.',
      };
    }

    const mappedSuggestions: {
      summary: string;
      workExperience: string;
      skills: string;
      education: string;
      achievements: string;
      contactInfo: string;
      certifications: string;
      languages: string;
      projects: string;
      volunteerWork: string;
    } = {
      summary: 'Add a concise professional summary highlighting your key strengths.',
      workExperience: 'Include quantifiable achievements in your work experience.',
      skills: 'Add more industry-specific technical and soft skills.',
      education: 'Format education section consistently with degrees and dates.',
      achievements: 'Add measurable achievements with specific metrics.',
      contactInfo: 'Ensure contact information is complete and professional.',
      certifications: 'Add relevant professional certifications and training.',
      languages: 'Include language proficiencies if relevant to the role.',
      projects: 'Highlight key projects with measurable outcomes.',
      volunteerWork: 'Include volunteer experience that demonstrates relevant skills.',
    };

    // Map backend suggestions to frontend categories
    atsSuggestions.forEach((suggestion: any) => {
      const category = suggestion.category?.toLowerCase();
      if (category) {
        switch (category) {
          case 'keywords':
            mappedSuggestions.summary = suggestion.suggestion || mappedSuggestions.summary;
            break;
          case 'experience':
            mappedSuggestions.workExperience = suggestion.suggestion || mappedSuggestions.workExperience;
            break;
          case 'skills':
            mappedSuggestions.skills = suggestion.suggestion || mappedSuggestions.skills;
            break;
          case 'education':
            mappedSuggestions.education = suggestion.suggestion || mappedSuggestions.education;
            break;
          case 'achievements':
            mappedSuggestions.achievements = suggestion.suggestion || mappedSuggestions.achievements;
            break;
          case 'contactinfo':
          case 'contact_info':
            mappedSuggestions.contactInfo = suggestion.suggestion || mappedSuggestions.contactInfo;
            break;
          case 'certifications':
            mappedSuggestions.certifications = suggestion.suggestion || mappedSuggestions.certifications;
            break;
          case 'languages':
            mappedSuggestions.languages = suggestion.suggestion || mappedSuggestions.languages;
            break;
          case 'projects':
            mappedSuggestions.projects = suggestion.suggestion || mappedSuggestions.projects;
            break;
          case 'volunteerwork':
          case 'volunteer_work':
            mappedSuggestions.volunteerWork = suggestion.suggestion || mappedSuggestions.volunteerWork;
            break;
          case 'formatting':
            // Apply formatting suggestions to multiple sections
            if (suggestion.suggestion) {
              mappedSuggestions.summary = suggestion.suggestion;
              mappedSuggestions.workExperience = suggestion.suggestion;
            }
            break;
        }
      }
    });

    return mappedSuggestions;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      // Check payment status first for repeat users
      const canProceed = await checkPaymentStatus();
      if (!canProceed) {
        // Payment modal is already shown by checkPaymentStatus
        return;
      }

      // Reset states
      setUploadState({
        isUploading: true,
        progress: 0,
        error: "",
        success: false,
      });

      // Reset upload steps
      setUploadSteps({
        current: 'upload',
        steps: [
          { id: 'upload', name: 'File Upload', status: 'active' },
          { id: 'extraction', name: 'Text Extraction', status: 'pending' },
          { id: 'fast-analysis', name: 'Fast Analysis', status: 'pending' },
          { id: 'ai-analysis', name: 'AI Processing', status: 'pending' },
          { id: 'content-improvement', name: 'Content Enhancement', status: 'pending' },
          { id: 'final-report', name: 'Report Generation', status: 'pending' }
        ]
      });

      // Step 1: File Upload
      updateUploadStep('upload', 'active');
      await new Promise(resolve => setTimeout(resolve, 500));
      updateUploadStep('upload', 'completed');

      // Step 2: Text Extraction
      updateUploadStep('extraction', 'active');
      await new Promise(resolve => setTimeout(resolve, 800));
      updateUploadStep('extraction', 'completed');

      // Step 3: Fast Analysis
      updateUploadStep('fast-analysis', 'active');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateUploadStep('fast-analysis', 'completed');

      // Step 4: AI Processing
      updateUploadStep('ai-analysis', 'active');

      // Create FormData
      const formData = new FormData();
      formData.append("file", file, file.name);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadState(prev => {
          const newProgress = Math.min(prev.progress + Math.random() * 15, 90);
          return { ...prev, progress: newProgress };
        });
      }, 200);

      // Upload file
      const response = await apiService.analyzeResume(formData);

      // Clear progress interval
      clearInterval(progressInterval);

      // Check if payment is required
      if (response.error === 'Payment required' && response.requiresPayment) {
        clearInterval(progressInterval);
        setUploadState(prev => ({ ...prev, isUploading: false, progress: 0 }));
        
        // Generate device ID using utility
        const deviceId = getDeviceId();
        
        setPaymentState({
          showPaymentModal: true,
          deviceId,
          analysisCount: response.analysisCount || 1,
        });
        return;
      }

      // Step 5: Content Improvement
      updateUploadStep('ai-analysis', 'completed');
      updateUploadStep('content-improvement', 'active');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateUploadStep('content-improvement', 'completed');

      // Step 6: Final Report
      updateUploadStep('final-report', 'active');
      await new Promise(resolve => setTimeout(resolve, 500));
      updateUploadStep('final-report', 'completed');

      // Complete upload
      setUploadState(prev => ({ ...prev, progress: 100, success: true }));

      // Update analysis status
      setAnalysisState({
        status: response.analysisStatus || 'complete',
        note: response.analysisNote || ''
      });

      // Update context with new resume data
      if (response.success) {
        // Debug logging to see what we're receiving
        console.log('📊 Response received:', {
          atsScore: response.atsScore,
          atsBreakdown: response.atsBreakdown,
          atsSuggestions: response.atsSuggestions,
          keyPoints: response.keyPoints,
          content: response.content?.substring(0, 100) + '...'
        });

        // Ensure we have valid ATS scores
        const overallScore = response.atsScore || 0;
        const breakdown = response.atsBreakdown as Record<string, unknown> || {};
        
        // Map backend breakdown fields to frontend expected fields
        const sectionScores = {
          summary: (breakdown.keywords as number) || 0,
          workExperience: (breakdown.experience as number) || 0,
          skills: (breakdown.skills as number) || 0,
          education: (breakdown.education as number) || 0,
          achievements: (breakdown.achievements as number) || 0,
          contactInfo: (breakdown.contactInfo as number) || 0,
          certifications: (breakdown.certifications as number) || 0,
          languages: (breakdown.languages as number) || 0,
          projects: (breakdown.projects as number) || 0,
          volunteerWork: (breakdown.volunteerWork as number) || 0,
        };

        // Log the mapped scores for debugging
        console.log('🎯 Mapped section scores:', sectionScores);
        console.log('📈 Overall ATS score:', overallScore);

        actions.uploadResume({
          text: response.content || '',
          keyPoints: response.keyPoints || [],
          analysis: {
            overallScore,
            sectionScores,
            suggestions: mapSuggestions(response.atsSuggestions),
            improvedContent: response.improvedContent,
            jobProfiles: response.jobProfiles || [],
          },
          atsScore: overallScore,
          resumeId: response.resumeId || '',
          filename: file.name,
          lastModified: new Date(),
        });

        // Track successful upload
        actions.addAction('Resume upload completed', { 
          filename: file.name,
          atsScore: overallScore,
          analysisCompleted: true
        });

        // Show success message briefly
        setTimeout(() => {
          setUploadState(prev => ({ ...prev, success: false }));
        }, 3000);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadState({
        isUploading: false,
        progress: 0,
        error: "Upload failed. Please try again.",
        success: false,
      });

      // Track upload failure
      actions.addAction('Resume upload failed', { 
        filename: file.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePaymentSuccess = () => {
    setPaymentState(prev => ({ ...prev, showPaymentModal: false }));
    // Retry the upload after successful payment
    if (fileInputRef.current?.files?.[0]) {
      handleFileUpload(fileInputRef.current.files[0]);
    }
  };

  const handlePaymentClose = () => {
    setPaymentState(prev => ({ ...prev, showPaymentModal: false }));
  };

  const guidance = getUploadGuidance();
  const requirements = getFileRequirements();
  const tips = getContextTips();

  return (
    <div className="space-y-6">
      {/* Context-Aware Guidance */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-start space-x-3">
          {guidance.icon}
          <div>
            <h3 className={`font-semibold ${guidance.color}`}>
              {guidance.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {guidance.message}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploadState.isUploading && (
          <div className="space-y-4">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Analyzing your resume...
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This may take a few moments
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadState.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {uploadState.success ? (
          <div className="space-y-4">
            <FiCheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <div>
              <p className="text-lg font-medium text-green-900 dark:text-green-100">
                Resume uploaded successfully!
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                Your resume is being analyzed
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <FiUpload className="mx-auto h-16 w-16 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Drop your resume here, or{" "}
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  browse files
                </button>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We&apos;ll analyze it and provide personalized recommendations
              </p>
            </div>
          </div>
        )}

        {uploadState.error && (
          <div className="mt-4 rounded-md bg-red-50 p-3 dark:bg-red-900/20">
            <div className="flex">
              <FiAlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-2 text-sm text-red-700 dark:text-red-200">
                {uploadState.error}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress with Steps */}
      {uploadState.isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Processing Your Resume
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please wait while we analyze your document...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Progress</span>
                <span>{Math.round(uploadState.progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadState.progress}%` }}
                />
              </div>
            </div>

            {/* Upload Steps */}
            <div className="space-y-3">
              {uploadSteps.steps.map((step) => (
                <div key={step.id} className="flex items-center space-x-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    step.status === 'completed' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                      : step.status === 'active'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse'
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                  }`}>
                    {step.status === 'completed' ? (
                      <FiCheckCircle className="h-3 w-3" />
                    ) : step.status === 'active' ? (
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-ping" />
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      step.status === 'completed' 
                        ? 'text-green-700 dark:text-green-300' 
                        : step.status === 'active'
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cancel Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setUploadState(prev => ({ ...prev, isUploading: false, progress: 0 }))}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Context-Aware Requirements */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          File Requirements
        </h3>
        <ul className="space-y-2">
          {requirements.map((requirement, index) => (
            <li key={index} className="flex items-center space-x-2">
              <FiCheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {requirement}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Context-Aware Tips */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          💡 Pro Tips for Better Results
        </h3>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start space-x-2">
              <FiInfo className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {tip}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Activity Context */}
      {state.recentActions.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h3>
          <div className="space-y-2">
            {state.recentActions.slice(0, 3).map((action, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  {action.action} - {new Date(action.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Status */}
      <AnalysisStatus 
        status={analysisState.status}
        note={analysisState.note}
        onRefresh={() => window.location.reload()}
      />

      {/* Payment Modal */}
      {paymentState.showPaymentModal && (
        <PaymentModal
          onClose={handlePaymentClose}
          onPaymentSuccess={handlePaymentSuccess}
          deviceId={paymentState.deviceId}
          analysisCount={paymentState.analysisCount}
        />
      )}
    </div>
  );
};

export default ContextAwareUploader;
