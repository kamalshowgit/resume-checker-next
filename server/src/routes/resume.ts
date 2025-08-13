import { Router } from 'express';
import { z } from 'zod';
import { extractKeyPoints, searchJobs, chatSuggest, calculateATSScore, improveContent, getFastInitialAnalysis } from '../lib/ai';
import { db } from '../lib/database';
import multer from 'multer';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import * as fs from 'fs';
import * as path from 'path';
// File system imports for future use

const router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'application/rtf',
      'text/rtf'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, Word, Text, and RTF files are allowed.'));
    }
  }
});

// Enhanced file upload with multiple format support
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No file uploaded',
        details: 'Please select a file to upload'
      });
    }

    const { originalname, mimetype, buffer, size } = req.file;
    console.log(`📁 Processing file: ${originalname} (${mimetype}, ${size} bytes)`);
    
    let extractedText = '';

    // Process different file types with better error handling
    try {
      switch (mimetype) {
        case 'application/pdf':
          console.log('📄 Processing PDF file...');
          try {
            const pdfData = await pdf(buffer);
            extractedText = pdfData.text;
            console.log(`✅ PDF processed successfully. Extracted ${extractedText.length} characters`);
          } catch (error) {
            console.error('❌ PDF parsing error:', error);
            return res.status(400).json({ 
              error: 'Failed to parse PDF file',
              details: 'The PDF may be corrupted, password-protected, or contain only images. Try converting to text or uploading a different format.',
              suggestion: 'Convert PDF to Word or text format, or copy-paste content directly'
            });
          }
          break;

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
          console.log('📝 Processing Word document...');
          try {
            const result = await mammoth.extractRawText({ buffer });
            extractedText = result.value;
            console.log(`✅ Word document processed successfully. Extracted ${extractedText.length} characters`);
          } catch (error) {
            console.error('❌ Word document parsing error:', error);
            return res.status(400).json({ 
              error: 'Failed to parse Word document',
              details: 'The document may be corrupted or in an unsupported format.',
              suggestion: 'Try saving as .docx format or copy-paste content directly'
            });
          }
          break;

        case 'text/plain':
        case 'application/rtf':
        case 'text/rtf':
          console.log('📃 Processing text file...');
          extractedText = buffer.toString('utf-8');
          console.log(`✅ Text file processed successfully. Extracted ${extractedText.length} characters`);
          break;

        default:
          // Try to extract text from unknown file types
          console.log(`🔍 Unknown file type: ${mimetype}, attempting text extraction...`);
          try {
            extractedText = buffer.toString('utf-8');
            if (extractedText.trim()) {
              console.log(`✅ Unknown file type processed as text. Extracted ${extractedText.length} characters`);
            } else {
              return res.status(400).json({ 
                error: 'Unsupported file type',
                details: `File type "${mimetype}" is not supported.`,
                suggestion: 'Please upload PDF, Word document, or text file. Alternatively, copy-paste your resume content directly.',
                supportedTypes: ['PDF', 'Word (.doc/.docx)', 'Text (.txt)', 'RTF']
              });
            }
          } catch (error) {
            return res.status(400).json({ 
              error: 'Unsupported file type',
              details: `Cannot extract text from "${mimetype}" file.`,
              suggestion: 'Please upload PDF, Word document, or text file. Alternatively, copy-paste your resume content directly.',
              supportedTypes: ['PDF', 'Word (.doc/.docx)', 'Text (.txt)', 'RTF']
            });
          }
      }
    } catch (processingError) {
      console.error('❌ File processing error:', processingError);
      return res.status(500).json({ 
        error: 'File processing failed',
        details: 'An unexpected error occurred while processing your file.',
        suggestion: 'Try uploading a different file or copy-paste content directly'
      });
    }

    // Validate extracted text
    if (!extractedText || !extractedText.trim()) {
      return res.status(400).json({ 
        error: 'No text content found',
        details: 'The uploaded file appears to be empty or contains no readable text.',
        suggestion: 'Please ensure your file contains text content, or copy-paste your resume directly'
      });
    }

    // Clean and validate text content
    const cleanedText = extractedText.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (cleanedText.length < 50) {
      return res.status(400).json({ 
        error: 'Insufficient content',
        details: 'The file contains very little text (less than 50 characters).',
        suggestion: 'Please upload a complete resume or copy-paste more content'
      });
    }

    console.log(`💾 Saving resume to database...`);
    
    // Store in database using the existing saveResume method
    const savedResume = db.saveResume(cleanedText);
    console.log(`✅ Resume saved with ID: ${savedResume.id}`);
    
    // Check payment status before AI analysis
    // Extract device ID from request headers (User-Agent + IP as fallback)
    const userAgent = req.headers['user-agent'] || 'unknown';
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const deviceId = `${userAgent.substring(0, 50)}_${clientIP}`.replace(/[^a-zA-Z0-9_-]/g, '_');
    
    const canPerformFreeAnalysis = db.canPerformFreeAnalysis(deviceId);
    
    if (!canPerformFreeAnalysis) {
      // Device has already used free analysis, check if it's paid
      const deviceStatus = db.getDeviceAnalysisStatus(deviceId);
      
      if (!deviceStatus?.isPaidUser) {
        // Device needs to pay for additional analysis
        return res.status(402).json({
          success: false,
          error: 'Payment required',
          message: 'You have used your free analysis. Please pay ₹49 for additional analyses.',
          requiresPayment: true,
          deviceId: deviceId,
          analysisCount: deviceStatus?.analysisCount || 1
        });
      }
    }
    
    // Increment analysis count for device
    db.incrementAnalysisCount(deviceId);
    
    // Get AI analysis with progressive loading
    console.log(`🤖 Starting progressive AI analysis...`);
    let atsScore = 0;
    let atsBreakdown = null;
    let atsSuggestions = null;
    let keyPoints: string[] = [];
    let improvedContent: { [key: string]: string } = {};
    let jobProfiles: Array<{ title: string; matchScore: number; reasoning: string }> = [];
    let isFullAnalysisComplete = false;
    
    // Set a global timeout for the entire analysis process
    const globalTimeout = setTimeout(() => {
      console.log('⏰ Global analysis timeout reached - sending response with available data');
    }, 10000); // 10 seconds total timeout
    
    try {
      console.log(`📝 Extracted text length: ${cleanedText.length} characters`);
      console.log(`📝 First 200 characters: ${cleanedText.substring(0, 200)}...`);
      
      // Step 1: Get fast initial analysis (immediate response)
      console.log(`🚀 Getting fast initial analysis...`);
      const fastResult = await getFastInitialAnalysis(cleanedText);
      
      atsScore = fastResult.score;
      atsBreakdown = fastResult.breakdown;
      atsSuggestions = fastResult.suggestions;
      keyPoints = fastResult.keyPoints;
      jobProfiles = fastResult.jobProfiles;
      
      console.log(`✅ Fast Analysis Complete - Score: ${atsScore}`);
      console.log(`📊 Fast Analysis Breakdown:`, atsBreakdown);
      console.log(`💡 Fast Analysis Suggestions:`, atsSuggestions?.length || 0);
      console.log(`🎯 Fast Analysis Key Points:`, keyPoints?.length || 0);
      
      // Step 2: Start full AI analysis in background (non-blocking)
      console.log(`🔄 Starting full AI analysis in background...`);
      const fullAnalysisPromise = (async () => {
        try {
          // Production optimization: reduce timeouts and complexity
          const isProduction = process.env.NODE_ENV === 'production';
          const analysisTimeout = isProduction ? 20000 : 30000; // 20s in production, 30s in dev
          
          const [atsResult, keyPointsResult] = await Promise.all([
            Promise.race([
              calculateATSScore(cleanedText),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('ATS scoring timeout')), analysisTimeout)
              )
            ]),
            Promise.race([
              extractKeyPoints(cleanedText),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Key points extraction timeout')), analysisTimeout)
              )
            ])
          ]);
          
          // Update with full AI results
          if (typeof atsResult === 'object' && atsResult !== null) {
            atsScore = (atsResult as any).score ?? atsScore;
            atsBreakdown = (atsResult as any).breakdown ?? atsBreakdown;
            atsSuggestions = (atsResult as any).suggestions ?? atsSuggestions;
            jobProfiles = (Array.isArray((atsResult as any).jobProfiles) ? (atsResult as any).jobProfiles : []) ?? [];
          }
          keyPoints = Array.isArray(keyPointsResult) ? keyPointsResult : [];
          isFullAnalysisComplete = true;
          
          console.log(`🎉 Full AI Analysis Complete - Score: ${atsScore}`);
          console.log(`📊 Full AI Breakdown:`, atsBreakdown);
          console.log(`💡 Full AI Suggestions:`, atsSuggestions?.length || 0);
          console.log(`🎯 Full AI Key Points:`, keyPoints?.length || 0);
          
          // TODO: Send WebSocket update to client when full analysis is ready
          // For now, client will need to refresh to see full results
          
        } catch (error) {
          console.error('❌ Full AI analysis failed:', error);
          // Keep fast analysis results, don't fail the request
        }
      })();
      
      // Step 3: Start content improvement in background (non-blocking)
      console.log(`🔄 Starting content improvement in background...`);
      const contentImprovementPromise = (async () => {
        try {
          // Check if we're in production mode - disable content improvement for speed
          const isProduction = process.env.NODE_ENV === 'production';
          if (isProduction) {
            console.log(`🚀 Production mode detected - skipping content improvement for faster response`);
            return;
          }
          
          // Generate improved content for each line (limit to prevent rate limiting)
          const lines = cleanedText.split('\n');
          const linesToImprove = lines
            .filter((line, index) => line && line.trim().length > 15 && index < 5) // Reduced to 5 lines
            .slice(0, 1); // Reduced to 1 line for faster response
          
          console.log(`[Content Improvement] Attempting to improve ${linesToImprove.length} lines`);
          
          for (let i = 0; i < linesToImprove.length; i++) {
            const line = linesToImprove[i];
            if (!line) continue; // Skip if line is undefined
            
            const lineIndex = lines.indexOf(line);
            
            if (line.trim().length > 15) {
              try {
                // Reduced delay for production
                if (i > 0) {
                  await new Promise(resolve => setTimeout(resolve, 1000)); // Reduced to 1 second
                }
                
                const improved = await Promise.race([
                  improveContent(line, 'general'),
                  new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Content improvement timeout')), 15000) // Reduced to 15 seconds
                  )
                ]);
                
                if ((improved as any).improvedText && (improved as any).improvedText !== line) {
                  improvedContent[lineIndex] = (improved as any).improvedText;
                  console.log(`[Line ${lineIndex}] Content improved successfully`);
                }
              } catch (error) {
                console.log(`[Line ${lineIndex}] Improvement failed:`, error);
                // Continue with other lines even if one fails
              }
            }
          }
          
          console.log(`✅ Content improvement completed. Improved Lines: ${Object.keys(improvedContent).length}`);
          
        } catch (error) {
          console.error('❌ Content improvement failed:', error);
          // Keep existing content, don't fail the request
        }
      })();
      
      // Don't await either promise - let them run in background
      // fullAnalysisPromise.catch(console.error);
      // contentImprovementPromise.catch(console.error);
      
      console.log(`✅ Fast analysis completed. ATS Score: ${atsScore}, Key Points: ${keyPoints.length}, Job Profiles: ${jobProfiles.length}`);
      console.log(`🔄 Full AI analysis and content improvement running in background...`);
      
      // Clear the global timeout since we have fast results
      clearTimeout(globalTimeout);
      
    } catch (aiError) {
      console.error('❌ AI analysis failed:', aiError);
      
      // Clear the global timeout
      clearTimeout(globalTimeout);
      
      // Use fallback scoring instead of throwing error
      console.log('🔄 Using fallback scoring...');
      try {
        // Import the fallback function
        const { calculateFallbackATSScore } = require('../lib/ai');
        const fallbackResult = calculateFallbackATSScore(cleanedText);
        
        // Type assertion for fallback result
        const typedResult = fallbackResult as {
          score: number;
          breakdown: Record<string, number>;
          suggestions: Array<{ category: string; issue: string; suggestion: string; impact: number }>;
          keyPoints?: string[];
          jobProfiles?: Array<{ title: string; matchScore: number; reasoning: string }>;
        };
        
        atsScore = typedResult.score || 50;
        atsBreakdown = typedResult.breakdown || {
          keywords: 50,
          formatting: 50,
          experience: 50,
          skills: 50,
          achievements: 50,
          contactInfo: 50,
          certifications: 0,
          languages: 0,
          projects: 0,
          volunteerWork: 0
        };
        atsSuggestions = typedResult.suggestions || [];
        keyPoints = typedResult.keyPoints || [];
        jobProfiles = typedResult.jobProfiles || [];
        
        console.log(`✅ Fallback scoring completed. Score: ${atsScore}`);
      } catch (fallbackError) {
        console.error('❌ Fallback scoring also failed:', fallbackError);
        
        // Provide basic scoring as last resort
        atsScore = 50;
        atsBreakdown = {
          keywords: 50,
          formatting: 50,
          experience: 50,
          skills: 50,
          achievements: 50,
          contactInfo: 50,
          certifications: 0,
          languages: 0,
          projects: 0,
          volunteerWork: 0
        };
        atsSuggestions = [{
          category: 'general',
          issue: 'Analysis system unavailable',
          suggestion: 'Please try again later or contact support',
          impact: 5
        }];
        keyPoints = ['Resume uploaded successfully', 'Basic analysis completed'];
        jobProfiles = [];
        
        console.log('⚠️ Using emergency fallback scoring');
      }
    }
    
    console.log(`📤 Sending response to client...`);
    
    // Validate and ensure we have valid ATS scores
    if (typeof atsScore !== 'number' || isNaN(atsScore)) {
      console.warn('⚠️ Invalid ATS score detected, using fallback');
      atsScore = 50;
    }
    
    if (!atsBreakdown || typeof atsBreakdown !== 'object') {
      console.warn('⚠️ Invalid ATS breakdown detected, using fallback');
      atsBreakdown = {
        keywords: 50, formatting: 50, experience: 50, skills: 50, achievements: 50,
        contactInfo: 50, certifications: 0, languages: 0, projects: 0, volunteerWork: 0
      };
    }
    
    if (!Array.isArray(atsSuggestions)) {
      console.warn('⚠️ Invalid ATS suggestions detected, using fallback');
      atsSuggestions = [{
        category: 'general',
        issue: 'Analysis in progress',
        suggestion: 'Please wait while we complete the full analysis',
        impact: 5
      }];
    }
    
    if (!Array.isArray(keyPoints)) {
      console.warn('⚠️ Invalid key points detected, using fallback');
      keyPoints = ['Resume uploaded successfully', 'Basic analysis completed'];
    }
    
    if (!Array.isArray(jobProfiles)) {
      console.warn('⚠️ Invalid job profiles detected, using fallback');
      jobProfiles = [];
    }
    
    // Log the final response data for debugging
    console.log(`📊 Final Response Data:`, {
      atsScore,
      atsBreakdown: JSON.stringify(atsBreakdown),
      atsSuggestions: atsSuggestions?.length || 0,
      keyPoints: keyPoints?.length || 0,
      improvedContent: Object.keys(improvedContent).length,
      jobProfiles: jobProfiles?.length || 0,
      analysisStatus: isFullAnalysisComplete ? 'complete' : 'partial',
      analysisNote: isFullAnalysisComplete 
        ? 'Full AI analysis completed' 
        : 'Fast analysis completed. Full AI analysis running in background. Refresh to see complete results.'
    });
    
    res.json({
      success: true,
      resumeId: savedResume.id,
      content: cleanedText,
      filename: originalname,
      fileType: mimetype,
      fileSize: size,
      atsScore,
      atsBreakdown,
      atsSuggestions,
      keyPoints,
      improvedContent,
      jobProfiles,
      message: 'File uploaded and processed successfully',
      analysisStatus: isFullAnalysisComplete ? 'complete' : 'partial',
      analysisNote: isFullAnalysisComplete 
        ? 'Full AI analysis completed' 
        : 'Full AI analysis running in background. Refresh to see complete results.',
      processingDetails: {
        charactersExtracted: cleanedText.length,
        linesExtracted: cleanedText.split('\n').length,
        processingTime: 0 // Will be calculated properly in future versions
      }
    });

  } catch (error) {
    console.error('❌ File upload error:', error);
    res.status(500).json({ 
      error: 'Failed to process uploaded file',
      details: 'An unexpected server error occurred.',
      suggestion: 'Please try again or contact support if the problem persists'
    });
  }
});

// Text analysis endpoint (for pasted text)
router.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        error: 'Text content is required',
        details: 'Please provide resume text to analyze'
      });
    }

    if (text.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Insufficient content',
        details: 'Please provide at least 50 characters of resume content',
        suggestion: 'Add more details about your experience, skills, and achievements'
      });
    }

    console.log(`📝 Analyzing pasted text (${text.length} characters)...`);
    
    // Clean the text
    const cleanedText = text.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Store in database
    const savedResume = db.saveResume(cleanedText);
    console.log(`✅ Resume saved with ID: ${savedResume.id}`);
    
    // Check payment status before AI analysis
    // Extract device ID from request headers (User-Agent + IP as fallback)
    const userAgent = req.headers['user-agent'] || 'unknown';
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const deviceId = `${userAgent.substring(0, 50)}_${clientIP}`.replace(/[^a-zA-Z0-9_-]/g, '_');
    
    const canPerformFreeAnalysis = db.canPerformFreeAnalysis(deviceId);
    
    if (!canPerformFreeAnalysis) {
      // Device has already used free analysis, check if it's paid
      const deviceStatus = db.getDeviceAnalysisStatus(deviceId);
      
      if (!deviceStatus?.isPaidUser) {
        // Device needs to pay for additional analysis
        return res.status(402).json({
          success: false,
          error: 'Payment required',
          message: 'You have used your free analysis. Please pay ₹49 for additional analyses.',
          requiresPayment: true,
          deviceId: deviceId,
          analysisCount: deviceStatus?.analysisCount || 1
        });
      }
    }
    
    // Increment analysis count for device
    db.incrementAnalysisCount(deviceId);
    
    // Get AI analysis (with fallback handling)
    console.log(`🤖 Getting AI analysis...`);
    let atsScore = 0;
    let atsBreakdown = null;
    let atsSuggestions = null;
    let keyPoints: string[] = [];
    let improvedContent: { [key: string]: string } = {};
    let jobProfiles: Array<{ title: string; matchScore: number; reasoning: string }> = [];
    
    try {
      console.log(`📝 Analyzing text length: ${cleanedText.length} characters`);
      
      const [atsResult, keyPointsResult] = await Promise.all([
        calculateATSScore(cleanedText),
        extractKeyPoints(cleanedText)
      ]);
      
      atsScore = atsResult.score;
      atsBreakdown = atsResult.breakdown;
      atsSuggestions = atsResult.suggestions;
      keyPoints = keyPointsResult;
      jobProfiles = atsResult.jobProfiles || [];
      
      console.log(`✅ ATS Analysis Results:`, {
        score: atsScore,
        breakdown: atsBreakdown,
        suggestionsCount: atsSuggestions?.length || 0,
        jobProfilesCount: jobProfiles.length
      });
      
      // Generate improved content for each line
      const lines = cleanedText.split('\n');
      for (let i = 0; i < Math.min(lines.length, 20); i++) { // Limit to first 20 lines
        const line = lines[i];
        if (line && line.trim().length > 10) {
          try {
            const improved = await improveContent(line, 'general');
            if (improved.improvedText && improved.improvedText !== line) {
              improvedContent[i] = improved.improvedText;
            }
          } catch (error) {
            console.log(`[Line ${i}] Improvement failed:`, error);
          }
        }
      }
      
      console.log(`✅ AI analysis completed. ATS Score: ${atsScore}, Key Points: ${keyPoints.length}, Improved Lines: ${Object.keys(improvedContent).length}, Job Profiles: ${jobProfiles.length}`);
    } catch (aiError) {
      console.error('❌ AI analysis failed:', aiError);
      // Don't use fallback - let the error propagate to ensure AI is always used
      throw new Error(`AI analysis failed: ${aiError instanceof Error ? aiError.message : 'Unknown error'}`);
    }
    
    console.log(`📤 Sending analysis response...`);
    
    res.json({
      success: true,
      resumeId: savedResume.id,
      content: cleanedText,
      filename: 'Pasted Text',
      fileType: 'text/plain',
      fileSize: cleanedText.length,
      atsScore,
      atsBreakdown,
      atsSuggestions,
      keyPoints,
      improvedContent,
      jobProfiles,
      message: 'Text analyzed successfully',
      processingDetails: {
        charactersExtracted: cleanedText.length,
        linesExtracted: cleanedText.split('\n').length,
        processingTime: 0 // Will be calculated properly in future versions
      }
    });

  } catch (error) {
    console.error('❌ Text analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze text',
      details: 'An unexpected server error occurred.',
      suggestion: 'Please try again or contact support if the problem persists'
    });
  }
});

// Enhanced ATS analysis endpoint
router.post('/ats-analysis', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text content is required' });
    }

    const atsResult = await calculateATSScore(text);
    const atsScore = atsResult.score;
    const breakdown = atsResult.breakdown;
    const suggestions = atsResult.suggestions;
    const jobProfiles = atsResult.jobProfiles || [];
    
    res.json({
      score: atsScore,
      breakdown,
      suggestions,
      jobProfiles,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('ATS analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze ATS score' });
  }
});

// File download endpoint with multiple formats
router.post('/download', async (req, res) => {
  try {
    const { text, format, fileName = 'resume' } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text content is required' });
    }

    let fileBuffer: Buffer;
    let mimeType: string;
    let extension: string;

    switch (format) {
      case 'docx':
        // Generate proper Word document using docx library
        try {
          const doc = generateWordDocument(text);
          fileBuffer = await Packer.toBuffer(doc);
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          extension = 'docx';
        } catch (error) {
          console.error('Word document generation failed:', error);
          return res.status(500).json({ error: 'Failed to generate Word document' });
        }
        break;

      case 'txt':
        fileBuffer = Buffer.from(text, 'utf-8');
        mimeType = 'text/plain';
        extension = 'txt';
        break;

      case 'pdf':
      default:
        // For PDF, we'll return the text content
        // In production, you'd generate a proper PDF
        fileBuffer = Buffer.from(text, 'utf-8');
        mimeType = 'application/pdf';
        extension = 'pdf';
        break;
    }

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}.${extension}"`);
    res.setHeader('Content-Length', fileBuffer.length.toString());
    
    res.send(fileBuffer);

  } catch (error) {
    console.error('File download error:', error);
    res.status(500).json({ error: 'Failed to generate download file' });
  }
});

// Generate Word document using docx library
function generateWordDocument(text: string): Document {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const children: any[] = [];
  
  // Extract header information
  const name = extractName(text);
  const title = extractTitle(text);
  const contactInfo = extractContactInfo(text);
  
  // Add header section
  if (name) {
    children.push(
      new Paragraph({
        text: name,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200, before: 200 }
      })
    );
  }
  
  if (title) {
    children.push(
      new Paragraph({
        text: title,
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200, before: 100 }
      })
    );
  }
  
  if (contactInfo) {
    children.push(
      new Paragraph({
        text: contactInfo,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300, before: 100 }
      })
    );
  }
  
  // Process content lines
  lines.forEach(line => {
    if (line.endsWith(':') || line.match(/^[A-Z][A-Z\s]+$/)) {
      // Section header
      children.push(
        new Paragraph({
          text: line,
          heading: HeadingLevel.HEADING_3,
          spacing: { after: 200, before: 300 },
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
          }
        })
      );
    } else if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
      // Bullet point
      children.push(
        new Paragraph({
          text: line.substring(1).trim(),
          spacing: { after: 100, before: 100 },
          indent: { left: 720 } // 0.5 inch indent
        })
      );
    } else if (line.trim()) {
      // Regular paragraph
      children.push(
        new Paragraph({
          text: line,
          spacing: { after: 100, before: 100 }
        })
      );
    }
  });
  
  return new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1440,    // 1 inch
            right: 1440,  // 1 inch
            bottom: 1440, // 1 inch
            left: 1440    // 1 inch
          }
        }
      },
      children
    }]
  });
}

// Helper functions to extract resume information
function extractName(text: string): string {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const firstLine = lines[0] || '';
  const nameMatch = /^(?:Name\s*[:\-]\s*)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})$/.exec(firstLine) || 
                   /Name\s*[:\-]\s*([^\n]+)/i.exec(text);
  return (nameMatch?.[1] || 'Your Name').trim();
}

function extractTitle(text: string): string {
  const roleMatch = /(?:Role|Position|Post)\s*[:\-]\s*([^\n]+)/i.exec(text) || 
                   /(Engineer|Developer|Manager|Designer|Analyst)[^\n]{0,40}/i.exec(text);
  return (roleMatch?.[0] || 'Professional Title').trim();
}

function extractContactInfo(text: string): string {
  const emailMatch = /(\S+@\S+\.\S+)/.exec(text);
  const phoneMatch = /([\+\d\s\-\(\)]{10,})/.exec(text);
  const locationMatch = /(Bengaluru|Bangalore|Hyderabad|Pune|Mumbai|Delhi|Chennai|Remote)/i.exec(text);
  
  const parts = [];
  if (emailMatch) parts.push(emailMatch[1]);
  if (phoneMatch) parts.push(phoneMatch[1]);
  if (locationMatch) parts.push(locationMatch[1]);
  
  return parts.join(' • ') || 'Contact Information';
}

const CheckSchema = z.object({
  text: z.string().min(20),
});

router.post('/check', async (req, res) => {
  const parse = CheckSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Invalid payload' });
  const { text } = parse.data;
  
  try {
    // DEBUG: Log the received CV text
    console.log('='.repeat(80));
    console.log('📄 CV UPLOAD DEBUG - RECEIVED TEXT:');
    console.log('='.repeat(80));
    console.log('Text length:', text.length);
    console.log('First 500 characters:');
    console.log(text.substring(0, 500));
    console.log('-'.repeat(40));
    console.log('Full text:');
    console.log(text);
    console.log('='.repeat(80));
    
    // Save resume to database (with duplicate handling)
    const savedResume = db.saveResume(text);
    console.log('💾 Resume saved to database:', {
      id: savedResume.id,
      name: savedResume.name,
      email: savedResume.email,
      phone: savedResume.phone,
      linkedin: savedResume.linkedin
    });
    
    // Extract key points and search jobs
    const [points, jobs] = await Promise.all([
      extractKeyPoints(text),
      searchJobs(text),
    ]);
    
    console.log('🔍 EXTRACTED KEY POINTS:');
    console.log(points);
    console.log('🔍 FOUND JOBS:');
    console.log(jobs);
    console.log('='.repeat(80));
    
    // Return response (no database info to frontend)
    res.json({ points, jobs });
    
  } catch (error) {
    console.error('❌ Error processing resume:', error);
    res.status(500).json({ error: 'Failed to process resume' });
  }
});

const ChatSchema = z.object({
  history: z
    .array(z.object({ role: z.enum(['user', 'assistant']), content: z.string() }))
    .default([]),
  message: z.string().min(1),
  context: z.object({
    resumeData: z.any().optional(),
    currentScore: z.number().optional().or(z.undefined()),
    keyPoints: z.array(z.string()).optional().or(z.undefined()),
    recentActions: z.array(z.any()).optional().or(z.undefined()),
    userSession: z.any().optional(),
  }).optional(),
});

router.post('/chat', async (req, res) => {
  const parse = ChatSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Invalid payload' });
  
  try {
    const reply = await chatSuggest(
      parse.data.history, 
      parse.data.message, 
      parse.data.context
    );
    res.json({ reply });
  } catch (error) {
    console.error('❌ Chat error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to get chat response' 
    });
  }
});

// Admin route to get database statistics (for future use)
router.get('/admin/stats', (req, res) => {
  try {
    const stats = db.getStats();
    console.log('📊 Database stats requested:', stats);
    res.json(stats);
  } catch (error) {
    console.error('❌ Error getting database stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Admin route to get all resumes (for future use) 
router.get('/admin/resumes', (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;
    
    const resumes = db.getAllResumes(limit, offset);
    const stats = db.getStats();
    
    console.log(`📋 Admin: Retrieved ${resumes.length} resumes (page ${page})`);
    
    res.json({
      resumes: resumes.map(r => ({
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        linkedin: r.linkedin,
        location: r.location,
        role: r.role,
        experienceYears: r.experienceYears,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
      })), // Don't send full resume text
      pagination: {
        page,
        limit,
        total: stats.totalResumes
      }
    });
  } catch (error) {
    console.error('❌ Error getting resumes:', error);
    res.status(500).json({ error: 'Failed to get resumes' });
  }
});

// AI Content Improvement
const ImproveSchema = z.object({
  text: z.string().min(10),
  category: z.string(),
  userInput: z.string().optional()
});

router.post('/improve', async (req, res) => {
  const parse = ImproveSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Invalid payload' });
  const { text, category, userInput } = parse.data;
  
  try {
    console.log(`🔧 Starting content improvement for category: ${category}`);
    const improvement = await improveContent(text, category, userInput);
    console.log('✅ Content improvement completed');
    res.json(improvement);
  } catch (error) {
    console.error('❌ Error in content improvement:', error);
    res.status(500).json({ error: 'Failed to improve content' });
  }
});

// Health check endpoint for AI services
router.get('/health', async (req, res) => {
  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        ai: 'checking',
        features: {
          resumeAnalysis: process.env.ENABLE_RESUME_ANALYSIS === 'true',
          atsScoring: process.env.ENABLE_ATS_SCORING === 'true',
          contentImprovement: process.env.ENABLE_CONTENT_IMPROVEMENT === 'true',
          chatAssistant: process.env.ENABLE_CHAT_ASSISTANT === 'true',
          jobSearch: process.env.ENABLE_JOB_SEARCH === 'true'
        }
      }
    };

    // Check AI service availability
    try {
      const provider = process.env.AI_PROVIDER || 'groq';
      const key = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
      
      if (key && key !== 'your_groq_api_key_here' && key !== 'your_actual_groq_api_key_here') {
        healthStatus.services.ai = 'configured';
      } else {
        healthStatus.services.ai = 'not_configured';
      }
    } catch (error) {
      healthStatus.services.ai = 'error';
    }

    res.json(healthStatus);
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;


