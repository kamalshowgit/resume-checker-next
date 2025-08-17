"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiCheck, FiCreditCard, FiLock } from "react-icons/fi";
import axios from "axios";

interface PaymentModalProps {
  onClose: () => void;
  onPaymentSuccess: () => void;
  email: string;
  analysisCount: number;
  isRetryAttempt?: boolean;
}

export function PaymentModal({
  onClose,
  onPaymentSuccess,
  email,
  analysisCount,
  isRetryAttempt,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // PayPal configuration
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "AaAYXnukym9O07d6-ykRVQ9CfYVCxMMcDDHYKg1SZRRq7HNxOUifg1qlzSFc9URGlm6aE2V_upadewsg";
  
  const handlePayPalPayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Create PayPal order
      const orderResponse = await axios.post("http://localhost:4000/api/pay/create-paypal-order", {
        email: email,
        amount: 49 // ₹49 in USD equivalent
      });
      
      if (!orderResponse.data.orderID) {
        throw new Error("Failed to create PayPal order");
      }

      // Initialize PayPal payment
      const paypal = (window as any).paypal;
      if (!paypal) {
        throw new Error("PayPal SDK not loaded");
      }

      paypal.Buttons({
        createOrder: function(data: any, actions: any) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.60', // $0.60 USD equivalent to ₹49
                currency_code: 'USD'
              },
              description: 'Resume Analysis Service',
              custom_id: email
            }]
          });
        },
        onApprove: async function(data: any, actions: any) {
          try {
            // Capture the payment
            const order = await actions.order.capture();
            
            // Verify payment with server
            const verifyResponse = await axios.post("http://localhost:4000/api/pay/verify-paypal", {
              orderID: order.id,
              payerID: order.payer.payer_id,
              email: email,
              paymentDetails: order
            });
            
            if (verifyResponse.data.success) {
              onPaymentSuccess();
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment capture error:", error);
            setError("Payment verification failed. Please contact support.");
          }
        },
        onError: function(err: any) {
          console.error("PayPal error:", err);
          setError("PayPal payment failed. Please try again.");
          setLoading(false);
        }
      }).render('#paypal-button-container');

    } catch (error) {
      console.error("Payment error:", error);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load PayPal SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      console.log('PayPal SDK loaded');
    };
    script.onerror = () => {
      setError('Failed to load PayPal SDK');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Trap focus within modal for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Payment Required</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="flex items-center space-x-2">
              <FiCheck className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {isRetryAttempt 
                  ? `AI Analysis Failed - Retry Required`
                  : `You've used ${analysisCount} analysis${analysisCount > 1 ? 'es' : ''}`
                }
              </span>
            </div>
            <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              {isRetryAttempt 
                ? "Our AI couldn't generate a proper report on your first attempt. Pay ₹49 for enhanced AI processing and a complete analysis."
                : "Your first analysis was free. Additional analyses are ₹49 each."
              }
            </p>
          </div>

          <div className="mt-6 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <FiCreditCard className="h-4 w-4 text-gray-500" />
                <span>Resume Analysis</span>
              </span>
              <span>₹49.00</span>
            </div>
            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>₹49.00</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-300">
              {error}
            </div>
          )}

          {/* PayPal Button Container */}
          <div id="paypal-button-container" className="mt-6"></div>

          <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            Secure payment processing by PayPal. Your payment information is not stored.
          </p>
          
          {/* Support Contact */}
          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            Need help? Contact us at: <a href="mailto:rsmchckrspprt@gmail.com" className="text-blue-600 hover:underline">rsmchckrspprt@gmail.com</a>
          </div>
          
          {/* PayPal Branding */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400">
            <span>Powered by</span>
            <svg className="h-4 w-16" viewBox="0 0 100 20" fill="currentColor">
              <path d="M20.5,10.5c0-5.5,4.5-10,10-10s10,4.5,10,10s-4.5,10-10,10S20.5,15.5,20.5,10.5z M25.5,10.5c0,2.8,2.2,5,5,5s5-2.2,5-5s-2.2-5-5-5S25.5,7.7,25.5,10.5z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
