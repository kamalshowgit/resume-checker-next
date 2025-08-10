import { NextRequest, NextResponse } from "next/server";
import { apiService } from "@/lib/services/api-service";

export async function POST(req: NextRequest) {
  try {
    const { query, resumeData } = await req.json();
    
    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
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
      // Use the API service to get chat response
      const response = await apiService.chatWithAI(query, resumeData);
      
      if (response.success) {
        return NextResponse.json(response);
      } else {
        return NextResponse.json(
          { error: response.error || "Failed to get chat response" },
          { status: 500 }
        );
      }
    } catch (apiError: any) {
      console.error("API service error:", apiError);
      return NextResponse.json(
        { error: apiError.message || "Failed to communicate with the chat service" },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
