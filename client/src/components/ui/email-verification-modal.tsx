"use client";

import React, { useState, useEffect } from 'react';
import { FiMail, FiLock, FiCheckCircle, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { apiService } from '../../lib/services/api-service';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailVerified: (email: string, isFirstTime: boolean) => void;
}

export function EmailVerificationModal({ isOpen, onClose, onEmailVerified }: EmailVerificationModalProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'verifying'>('email');
  const [isVerifying, setIsVerifying] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsVerifying(true);

    try {
      // Check if email exists and get analysis count
      const response = await apiService.checkEmailStatus(email);
      
      if (response.success) {
        setIsFirstTime(response.analysisCount === 0);
        setStep('otp');
        
        // Send OTP
        await apiService.sendOTP(email);
        setSuccess('OTP sent to your email!');
        setCountdown(60); // 60 second cooldown
        setCanResend(false);
      } else {
        setError(response.error || 'Failed to check email status');
        setStep('email');
      }
    } catch (error) {
      setError('Failed to verify email. Please try again.');
      setStep('email');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOTPSubmit = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setError('');
    setIsVerifying(true);

    try {
      // Verify OTP
      const response = await apiService.verifyOTP(email, otp);
      
      if (response.success) {
        setSuccess('Email verified successfully!');
        setTimeout(() => {
          onEmailVerified(email, isFirstTime);
          onClose();
        }, 1000);
      } else {
        setError(response.error || 'Invalid OTP. Please try again.');
        setStep('otp');
      }
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
      setStep('otp');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      await apiService.sendOTP(email);
      setSuccess('OTP resent to your email!');
      setCountdown(60);
      setCanResend(false);
      setError('');
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handleClose = () => {
    if (step === 'verifying') return; // Prevent closing during verification
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {step === 'email' && 'Enter Your Email'}
            {step === 'otp' && 'Verify Your Email'}
            {step === 'verifying' && 'Verifying...'}
          </h2>
          {step !== 'verifying' && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Email Input Step */}
          {step === 'email' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isVerifying}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  We'll use this to track your analysis history and send you important updates.
                </p>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <FiAlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleEmailSubmit}
                disabled={!email.trim() || isVerifying}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FiMail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Check Your Email
                </h3>
                <p className="text-gray-600 text-sm">
                  We've sent a 6-digit verification code to:
                </p>
                <p className="text-blue-600 font-medium mt-1">{email}</p>
                
                {/* Payment Status Info */}
                {!isFirstTime && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      ⚠️ <strong>Payment Required:</strong> You've used your free analysis. 
                      Additional analyses cost ₹49 each.
                    </p>
                  </div>
                )}
                
                {isFirstTime && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✅ <strong>Free Analysis Available:</strong> This is your first time! 
                      You get one free resume analysis.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                    maxLength={6}
                    disabled={isVerifying}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <FiAlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center space-x-2 text-green-600 text-sm">
                  <FiCheckCircle className="h-4 w-4" />
                  <span>{success}</span>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleOTPSubmit}
                  disabled={otp.length !== 6 || isVerifying}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                </button>

                <div className="text-center">
                  <button
                    onClick={handleResendOTP}
                    disabled={!canResend}
                    className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed text-sm"
                  >
                    {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Verifying Step */}
          {step === 'verifying' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                              <p className="text-gray-600">
                  {isVerifying ? 'Verifying...' : 'Processing...'}
                </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
