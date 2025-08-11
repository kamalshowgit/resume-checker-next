"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// Types for resume context
export interface ResumeData {
  text: string;
  keyPoints: string[];
  analysis: {
    overallScore: number;
    sectionScores: {
      summary: number;
      workExperience: number;
      skills: number;
      education: number;
      achievements: number;
      contactInfo: number;
      certifications: number;
      languages: number;
      projects: number;
      volunteerWork: number;
    };
    suggestions: {
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
    };
    improvedContent?: {
      [key: string]: string;
    };
    jobProfiles?: Array<{
      title: string;
      matchScore: number;
      reasoning: string;
    }>;
  };
  atsScore: number;
  resumeId: string;
  filename: string;
  lastModified: Date;
}

export interface UserSession {
  sessionId: string;
  startTime: Date;
  lastActivity: Date;
  resumeUploads: number;
  analysisCount: number;
  chatMessages: number;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    autoSave: boolean;
  };
}

export interface ContextState {
  resumeData: ResumeData | null;
  userSession: UserSession;
  isAnalyzing: boolean;
  isEditing: boolean;
  activeSection: 'upload' | 'analysis' | 'chat';
  recentActions: Array<{
    action: string;
    timestamp: Date;
    details?: Record<string, unknown>;
  }>;
  suggestions: {
    nextSteps: string[];
    improvements: string[];
    careerAdvice: string[];
  };
}

// Action types
type ResumeAction =
  | { type: 'SET_RESUME_DATA'; payload: ResumeData }
  | { type: 'UPDATE_RESUME_TEXT'; payload: string }
  | { type: 'SET_ANALYZING'; payload: boolean }
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'SET_ACTIVE_SECTION'; payload: 'upload' | 'analysis' | 'chat' }
  | { type: 'ADD_ACTION'; payload: { action: string; details?: Record<string, unknown> } }
  | { type: 'UPDATE_SESSION_ACTIVITY' }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserSession['preferences']> }
  | { type: 'CLEAR_RESUME_DATA' }
  | { type: 'UPDATE_SUGGESTIONS'; payload: Partial<ContextState['suggestions']> };

// Initial state
const initialState: ContextState = {
  resumeData: null,
  userSession: {
    sessionId: generateSessionId(),
    startTime: new Date(),
    lastActivity: new Date(),
    resumeUploads: 0,
    analysisCount: 0,
    chatMessages: 0,
    preferences: {
      theme: 'auto',
      notifications: true,
      autoSave: true,
    },
  },
  isAnalyzing: false,
  isEditing: false,
  activeSection: 'upload',
  recentActions: [],
  suggestions: {
    nextSteps: [],
    improvements: [],
    careerAdvice: [],
  },
};

// Reducer function
function resumeReducer(state: ContextState, action: ResumeAction): ContextState {
  switch (action.type) {
    case 'SET_RESUME_DATA':
      return {
        ...state,
        resumeData: action.payload,
        userSession: {
          ...state.userSession,
          resumeUploads: state.userSession.resumeUploads + 1,
          lastActivity: new Date(),
        },
        recentActions: [
          { action: 'Resume uploaded and analyzed', timestamp: new Date(), details: { filename: action.payload.filename } },
          ...state.recentActions.slice(0, 9), // Keep last 10 actions
        ],
      };

    case 'UPDATE_RESUME_TEXT':
      if (!state.resumeData) return state;
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          text: action.payload,
          lastModified: new Date(),
          version: (state.resumeData.version || 0) + 1,
        },
        recentActions: [
          { action: 'Resume content updated', timestamp: new Date() },
          ...state.recentActions.slice(0, 9),
        ],
      };

    case 'SET_ANALYZING':
      return {
        ...state,
        isAnalyzing: action.payload,
        userSession: {
          ...state.userSession,
          lastActivity: new Date(),
        },
      };

    case 'SET_EDITING':
      return {
        ...state,
        isEditing: action.payload,
        userSession: {
          ...state.userSession,
          lastActivity: new Date(),
        },
      };

    case 'SET_ACTIVE_SECTION':
      return {
        ...state,
        activeSection: action.payload,
        userSession: {
          ...state.userSession,
          lastActivity: new Date(),
        },
        recentActions: [
          { action: `Switched to ${action.payload} section`, timestamp: new Date() },
          ...state.recentActions.slice(0, 9),
        ],
      };

    case 'ADD_ACTION':
      return {
        ...state,
        recentActions: [
          { action: action.payload.action, timestamp: new Date(), details: action.payload.details },
          ...state.recentActions.slice(0, 9),
        ],
        userSession: {
          ...state.userSession,
          lastActivity: new Date(),
        },
      };

    case 'UPDATE_SESSION_ACTIVITY':
      return {
        ...state,
        userSession: {
          ...state.userSession,
          lastActivity: new Date(),
        },
      };

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        userSession: {
          ...state.userSession,
          preferences: {
            ...state.userSession.preferences,
            ...action.payload,
          },
        },
      };

    case 'CLEAR_RESUME_DATA':
      return {
        ...state,
        resumeData: null,
        recentActions: [
          { action: 'Resume data cleared', timestamp: new Date() },
          ...state.recentActions.slice(0, 9),
        ],
      };

    case 'UPDATE_SUGGESTIONS':
      return {
        ...state,
        suggestions: {
          ...state.suggestions,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}

// Context
const ResumeContext = createContext<{
  state: ContextState;
  dispatch: React.Dispatch<ResumeAction>;
  actions: {
    uploadResume: (data: ResumeData) => void;
    updateResumeText: (text: string) => void;
    setAnalyzing: (analyzing: boolean) => void;
    setEditing: (editing: boolean) => void;
    setActiveSection: (section: 'upload' | 'analysis' | 'chat') => void;
    addAction: (action: string, details?: Record<string, unknown>) => void;
    clearResumeData: () => void;
    updatePreferences: (preferences: Partial<UserSession['preferences']>) => void;
    getContextAwareSuggestions: () => string[];
    getNextSteps: () => string[];
  };
} | null>(null);

// Provider component
export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('resume-checker-preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
      } catch (error) {
        console.error('Failed to load preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('resume-checker-preferences', JSON.stringify(state.userSession.preferences));
  }, [state.userSession.preferences]);

  // Auto-save resume data if enabled
  useEffect(() => {
    if (state.userSession.preferences.autoSave && state.resumeData && !state.isAnalyzing) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('resume-checker-autosave', JSON.stringify({
          ...state.resumeData,
          lastModified: new Date(),
        }));
      }, 5000); // Auto-save after 5 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [state.resumeData, state.isAnalyzing, state.userSession.preferences.autoSave]);

  // Context-aware suggestions
  const getContextAwareSuggestions = (): string[] => {
    const suggestions: string[] = [];
    
    if (!state.resumeData) {
      suggestions.push('Upload your resume to get started with AI-powered analysis');
      suggestions.push('Try our career chat feature for general career advice');
      return suggestions;
    }

    if (state.resumeData.atsScore && state.resumeData.atsScore < 70) {
      suggestions.push('Your ATS score could be improved. Consider optimizing keywords and formatting');
    }

    if (state.resumeData.keyPoints && state.resumeData.keyPoints.length < 5) {
      suggestions.push('Add more quantifiable achievements to strengthen your resume');
    }

    if (state.userSession.analysisCount === 0) {
      suggestions.push('Run a comprehensive analysis to identify improvement areas');
    }

    if (state.userSession.chatMessages === 0) {
      suggestions.push('Ask our AI career advisor for personalized improvement suggestions');
    }

    return suggestions;
  };

  const getNextSteps = (): string[] => {
    const nextSteps: string[] = [];
    
    if (!state.resumeData) {
      nextSteps.push('Upload your resume');
      return nextSteps;
    }

    if (state.resumeData.atsScore && state.resumeData.atsScore < 70) {
      nextSteps.push('Optimize ATS score');
    }

    if (state.resumeData.keyPoints && state.resumeData.keyPoints.length < 5) {
      nextSteps.push('Enhance key achievements');
    }

    nextSteps.push('Get personalized career advice');
    nextSteps.push('Explore job recommendations');

    return nextSteps;
  };

  const actions = {
    uploadResume: (data: ResumeData) => {
      dispatch({ type: 'SET_RESUME_DATA', payload: data });
      dispatch({ type: 'SET_ACTIVE_SECTION', payload: 'analysis' });
    },
    updateResumeText: (text: string) => {
      dispatch({ type: 'UPDATE_RESUME_TEXT', payload: text });
    },
    setAnalyzing: (analyzing: boolean) => {
      dispatch({ type: 'SET_ANALYZING', payload: analyzing });
    },
    setEditing: (editing: boolean) => {
      dispatch({ type: 'SET_EDITING', payload: editing });
    },
    setActiveSection: (section: 'upload' | 'analysis' | 'chat') => {
      dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
    },
          addAction: (action: string, details?: Record<string, unknown>) => {
      dispatch({ type: 'ADD_ACTION', payload: { action, details } });
    },
    clearResumeData: () => {
      dispatch({ type: 'CLEAR_RESUME_DATA' });
    },
    updatePreferences: (preferences: Partial<UserSession['preferences']>) => {
      dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
    },
    getContextAwareSuggestions,
    getNextSteps,
  };

  return (
    <ResumeContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </ResumeContext.Provider>
  );
}

// Hook to use the context
export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
}

// Utility function to generate session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
