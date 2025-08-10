"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";

interface PaymentModalProps {
  onClose: () => void;
  onPaymentSuccess: () => void;
  userEmail?: string;
}

export function PaymentModal({
  onClose,
  onPaymentSuccess,
  userEmail = "",
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // In a real application, this would integrate with Razorpay or Stripe
  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Mock payment processing
      // In a real app, this would create a payment session with Razorpay/Stripe
      // and handle the payment flow
      
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      
      // After successful payment, update the user's payment status
      const response = await axios.post("http://localhost:5000/api/payment", {
        email: userEmail,
        paymentId: `mock_payment_${Date.now()}`, // This would be the actual payment ID from the payment gateway
      });

      if (response.data.success) {
        onPaymentSuccess();
      } else {
        throw new Error("Payment verification failed");
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
          <p className="text-gray-600 dark:text-gray-400">
            Your first resume analysis is free. Additional analyses are ₹49 each.
          </p>

          <div className="mt-6 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <span>Resume Analysis</span>
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
        </div>
      </div>
    </div>
  );
}
