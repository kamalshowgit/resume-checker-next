import { NextRequest, NextResponse } from "next/server";
import { apiService } from "../../../lib/services/api-service";

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR' } = await req.json();
    
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }
    
    // Check if server is available
    const serverStatus = await apiService.getServerStatus();
    if (serverStatus.status === 'offline') {
      return NextResponse.json(
        { error: "Backend service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    try {
      // Use the API service to create payment
      const response = await apiService.createPayment(amount, currency);
      
      if (response.success) {
        return NextResponse.json(response);
      } else {
        return NextResponse.json(
          { error: response.error || "Failed to create payment" },
          { status: 500 }
        );
      }
    } catch (apiError: unknown) {
      console.error("API service error:", apiError);
      const errorMessage = apiError instanceof Error ? apiError.message : "Failed to communicate with the payment service";
      return NextResponse.json(
        { error: errorMessage },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Error in payment API:", error);
    return NextResponse.json(
      { error: "Failed to process payment request" },
      { status: 500 }
    );
  }
}
