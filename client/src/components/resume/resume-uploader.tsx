"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiFile, FiCheckCircle } from "react-icons/fi";

interface ResumeUploaderProps {
  onAnalysis: (file: File) => void;
  isAnalyzing?: boolean;
}

export function ResumeUploader({ onAnalysis, isAnalyzing = false }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt'],
      'application/rtf': ['.rtf']
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const handleAnalyze = () => {
    if (file) {
      onAnalysis(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        {...getRootProps()}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
          isDragActive
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <FiUpload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              or click to browse files
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Supports PDF, DOCX, DOC, TXT, RTF (Max 10MB)
          </p>
        </div>
      </div>

      {/* File Preview */}
      {file && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
          <div className="flex items-center space-x-3">
            <FiFile className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatFileSize(file.size)}
              </p>
            </div>
            <FiCheckCircle className="h-5 w-5 text-green-500" />
          </div>
        </div>
      )}

      {/* Analyze Button */}
      {file && (
        <div className="text-center">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={`inline-flex h-12 items-center justify-center rounded-lg px-8 text-base font-medium shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isAnalyzing
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Analyzing...
              </>
            ) : (
              <>
                <FiCheckCircle className="mr-2 h-5 w-5" />
                Analyze Resume with AI
              </>
            )}
          </button>
        </div>
      )}

      {/* Features List */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-600 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          What you&apos;ll get:
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-600 dark:bg-green-900 dark:text-green-400">
              ✓
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Key achievements extraction</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-600 dark:bg-green-900 dark:text-green-400">
              ✓
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Section-by-section scoring</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-600 dark:bg-green-900 dark:text-green-400">
              ✓
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">ATS optimization score</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-600 dark:bg-green-900 dark:text-green-400">
              ✓
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Job recommendations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
