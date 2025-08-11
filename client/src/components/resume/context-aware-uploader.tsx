"use client";

import React, { useState, useCallback, useRef } from "react";
import { FiUpload, FiFileText, FiCheckCircle, FiAlertCircle, FiInfo, FiTarget } from "react-icons/fi";
import { useResumeContext } from "../../lib/context/resume-context";
import { apiService } from "../../lib/services/api-service";
import { PaymentModal } from "./payment-modal";
import { getDeviceId } from "../../lib/utils/device-id";

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

const ContextAwareUploader: React.FC = () => {
  const { state, actions } = useResumeContext();
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
  });
  const [dragActive, setDragActive] = useState(false);
  const [paymentState, setPaymentState] = useState<PaymentState>({
    showPaymentModal: false,
    deviceId: '',
    analysisCount: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    // Validate file
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: "Please upload a PDF, DOC, DOCX, or TXT file.",
        success: false,
      });
      return;
    }

    if (file.size > maxSize) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: "File size must be less than 5MB.",
        success: false,
      });
      return;
    }

    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
      success: false,
    });

    try {
      // Track upload action
      actions.addAction('Resume upload started', { 
        filename: file.name, 
        fileSize: file.size,
        fileType: file.type 
      });

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }));
      }, 200);

      // Create FormData and explicitly append the file with correct name
      // The server expects the file field to be named 'file', not 'resume'
      const formData = new FormData();
      formData.append("file", file, file.name); // Include filename as third parameter

      const response = await apiService.analyzeResume(formData);

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

      clearInterval(progressInterval);
      setUploadState(prev => ({ ...prev, progress: 100, success: true }));

      // Update context with new resume data
      if (response.success) {
        actions.uploadResume({
          text: response.content || '',
          keyPoints: response.keyPoints || [],
          analysis: {
            overallScore: response.atsScore || 0,
            sectionScores: {
              summary: (response.atsBreakdown as any)?.summary || 0,
              workExperience: (response.atsBreakdown as any)?.experience || 0,
              skills: (response.atsBreakdown as any)?.skills || 0,
              education: (response.atsBreakdown as any)?.education || 0,
              achievements: (response.atsBreakdown as any)?.achievements || 0,
              contactInfo: (response.atsBreakdown as any)?.contactInfo || 0,
              certifications: (response.atsBreakdown as any)?.certifications || 0,
              languages: (response.atsBreakdown as any)?.languages || 0,
              projects: (response.atsBreakdown as any)?.projects || 0,
              volunteerWork: (response.atsBreakdown as any)?.volunteerWork || 0,
            },
            suggestions: {
              summary: (response.atsSuggestions as any)?.summary || 'Add a concise professional summary highlighting your key strengths.',
              workExperience: (response.atsSuggestions as any)?.experience || 'Include quantifiable achievements in your work experience.',
              skills: (response.atsSuggestions as any)?.skills || 'Add more industry-specific technical and soft skills.',
              education: (response.atsSuggestions as any)?.education || 'Format education section consistently with degrees and dates.',
              achievements: (response.atsSuggestions as any)?.achievements || 'Add measurable achievements with specific metrics.',
              contactInfo: (response.atsSuggestions as any)?.contactInfo || 'Ensure contact information is complete and professional.',
              certifications: (response.atsSuggestions as any)?.certifications || 'Add relevant professional certifications and training.',
              languages: (response.atsSuggestions as any)?.languages || 'Include language proficiencies if relevant to the role.',
              projects: (response.atsSuggestions as any)?.projects || 'Highlight key projects with measurable outcomes.',
              volunteerWork: (response.atsSuggestions as any)?.volunteerWork || 'Include volunteer experience that demonstrates relevant skills.',
            },
            improvedContent: response.improvedContent,
            jobProfiles: response.jobProfiles || [],
          },
          atsScore: response.atsScore || 0,
          resumeId: response.resumeId || '',
          filename: file.name,
          lastModified: new Date(),
        });

        // Track successful upload
        actions.addAction('Resume upload completed', { 
          filename: file.name,
          atsScore: response.atsScore,
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

        {uploadState.isUploading ? (
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
        ) : uploadState.success ? (
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
                We'll analyze it and provide personalized recommendations
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
