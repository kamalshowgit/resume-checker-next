import { NextRequest, NextResponse } from "next/server";
import { apiService } from "../../../lib/services/api-service";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    console.log("API route received request:", { 
      fileName: file?.name, 
      fileSize: file?.size,
      fileType: file?.type,
      formDataEntries: Array.from(formData.entries()).map(([key]) => key)
    });
    
    if (!file) {
      return NextResponse.json(
        { error: "Resume file is required" },
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
      // Forward the request to the correct endpoint on the server
      // The server endpoint is '/api/resume/upload' but we're using apiService which already has the base URL
      const response = await apiService.analyzeResume(formData);
      
      console.log("API response received:", {
        success: response.success,
        resumeId: response.resumeId,
        hasContent: !!response.content,
        contentLength: response.content?.length || 0,
        error: response.error
      });
      
      if (response.success) {
        return NextResponse.json(response);
      } else {
        return NextResponse.json(
          { error: response.error || "Failed to analyze resume" },
          { status: 500 }
        );
      }
    } catch (apiError: unknown) {
      console.error("API service error:", apiError);
      const errorMessage = apiError instanceof Error ? apiError.message : "Failed to communicate with the analysis service";
      return NextResponse.json(
        { error: errorMessage },
        { status: 503 }
      );
    }
  } catch (error: unknown) {
    console.error("Error analyzing resume:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to analyze resume";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
