"use client";

import { useEffect, useState } from "react";
import { FiX, FiCreditCard, FiShield, FiCheck } from "react-icons/fi";
import axios from "axios";

interface PaymentModalProps {
  onClose: () => void;
  onPaymentSuccess: () => void;
  deviceId: string;
  analysisCount: number;
}

export function PaymentModal({
  onClose,
  onPaymentSuccess,
  deviceId,
  analysisCount,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // In a real application, this would integrate with Razorpay or Stripe
  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Create payment order
      const orderResponse = await axios.post("http://localhost:5000/api/pay/create-order", {
        deviceId: deviceId
      });
      
      if (!orderResponse.data.id) {
        throw new Error("Failed to create payment order");
      }

      // Check if we're in mock mode
      if (orderResponse.data.mock) {
        // Mock payment mode - simulate payment success
        console.log("🧪 Mock payment mode - simulating payment success");
        
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate payment verification
        const verifyResponse = await axios.post("http://localhost:5000/api/pay/verify", {
          razorpay_order_id: orderResponse.data.id,
          razorpay_payment_id: `mock_payment_${Date.now()}`,
          razorpay_signature: "mock_signature",
          deviceId: deviceId
        });
        
        if (verifyResponse.data.success) {
          onPaymentSuccess();
        } else {
          throw new Error("Mock payment verification failed");
        }
      } else {
        // Real Razorpay payment mode
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
          throw new Error("Razorpay API key not configured");
        }

        // Initialize Razorpay payment
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: 4900, // ₹49.00 in paise
          currency: "INR",
          name: "ResumeCheck",
          description: "Resume Analysis Service",
          order_id: orderResponse.data.id,
          handler: async function (response: any) {
            try {
              // Verify payment
              const verifyResponse = await axios.post("http://localhost:5000/api/pay/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                deviceId: deviceId
              });
              
              if (verifyResponse.data.success) {
                onPaymentSuccess();
              } else {
                throw new Error("Payment verification failed");
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              setError("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            email: 'user@example.com', // Default email for Razorpay
          },
          theme: {
            color: "#2563eb",
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      }
      
    } catch (error) {
      console.error("Payment error:", error);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                You've used {analysisCount} analysis{analysisCount > 1 ? 'es' : ''}
              </span>
            </div>
            <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              Your first analysis was free. Additional analyses are ₹49 each.
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

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:focus:ring-offset-gray-900"
          >
            {loading ? "Processing..." : "Pay ₹49"}
          </button>

          <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            Secure payment processing. Your payment information is not stored.
          </p>
          
          {/* Mock Payment Indicator */}
          <div className="mt-4 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-600">🧪</span>
              <span className="text-xs text-yellow-800 dark:text-yellow-200">
                <strong>Development Mode:</strong> Payment simulation enabled. No real charges will be made.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
