import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';

export interface ResumeRecord {
  id?: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  location?: string | null;
  role?: string | null;
  experienceYears?: number | null;
  skills?: string | null; // JSON string
  education?: string | null;
  resumeText: string;
  extractedData?: string | null; // JSON string of all extracted data
  atsScore?: number | null; // ATS score for quick access
  atsBreakdown?: string | null; // ATS breakdown (JSON)
  analysisResults?: string | null; // Full analysis results (JSON)
  fileType?: string | null; // Original file type (PDF, DOCX, etc.)
  fileSize?: number | null; // Original file size
  uploadSource?: string | null; // Source of upload
  createdAt?: string;
  updatedAt?: string;
}

class DatabaseService {
  private db: Database.Database;

  constructor() {
    try {
      // Use Render's persistent disk path in production
      const dbPath = process.env.NODE_ENV === 'production' 
        ? '/opt/render/project/src/data/resumes.db'  // Render persistent path
        : join(__dirname, '../../data/resumes.db');  // Local development path
      
      // Ensure the data directory exists
      const dataDir = dirname(dbPath);
      if (!existsSync(dataDir)) {
        console.log(`📁 Creating data directory: ${dataDir}`);
        mkdirSync(dataDir, { recursive: true });
      }
      
      console.log(`🗄️ Initializing database at: ${dbPath}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      this.db = new Database(dbPath);
      
      // Enable WAL mode for better performance
      this.db.pragma('journal_mode = WAL');
      
      this.initializeTables();
    } catch (error) {
      console.error('❌ Failed to initialize database:', error);
      throw new Error(`Database initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private initializeTables() {
    // Create resumes table with enhanced storage
    const createResumeTable = `
      CREATE TABLE IF NOT EXISTS resumes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        linkedin TEXT,
        location TEXT,
        role TEXT,
        experienceYears INTEGER,
        skills TEXT, -- JSON string
        education TEXT,
        resumeText TEXT NOT NULL,
        extractedData TEXT, -- JSON string of all extracted data
        atsScore INTEGER, -- ATS score for quick access
        atsBreakdown TEXT, -- ATS breakdown (JSON)
        analysisResults TEXT, -- Full analysis results (JSON)
        fileType TEXT, -- Original file type (PDF, DOCX, etc.)
        fileSize INTEGER, -- Original file size
        uploadSource TEXT DEFAULT 'web', -- Source of upload
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    this.db.exec(createResumeTable);
    
    // Create indexes for efficient duplicate detection and queries
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_email ON resumes(email)');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_phone ON resumes(phone)');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_linkedin ON resumes(linkedin)');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_created_at ON resumes(createdAt)');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_updated_at ON resumes(updatedAt)');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_ats_score ON resumes(atsScore)');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_role ON resumes(role)');
    
    console.log('📊 Database initialized successfully with enhanced storage');
  }

  /**
   * Extract contact information from resume text
   */
  extractContactInfo(text: string): Partial<ResumeRecord> {
    const extracted: Partial<ResumeRecord> = {};
    
    // Extract email (improved regex)
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i);
    if (emailMatch) {
      extracted.email = emailMatch[0].toLowerCase();
    }
    
    // Extract phone numbers (multiple formats)
    const phonePatterns = [
      /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
      /(\+\d{1,3}[-.\s]?)?\d{10,14}/g
    ];
    
    for (const pattern of phonePatterns) {
      const phoneMatch = text.match(pattern);
      if (phoneMatch) {
        // Clean phone number
        extracted.phone = phoneMatch[0].replace(/[^\d+]/g, '');
        break;
      }
    }
    
    // Extract LinkedIn profile
    const linkedinPatterns = [
      /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9-]+)/i,
      /linkedin\.com\/in\/([a-zA-Z0-9-]+)/i,
      /\/in\/([a-zA-Z0-9-]+)/i
    ];
    
    for (const pattern of linkedinPatterns) {
      const linkedinMatch = text.match(pattern);
      if (linkedinMatch) {
        extracted.linkedin = `https://linkedin.com/in/${linkedinMatch[1]}`;
        break;
      }
    }
    
    // Extract name (multiple approaches)
    const namePatterns = [
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/m, // Start of text
      /Name\s*[:\-]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/i,
      /([A-Z][a-z]+\s+[A-Z][a-z]+)(?=\s*(?:\n|$|[A-Z][a-z]+@))/m // Before email or end
    ];
    
    for (const pattern of namePatterns) {
      const nameMatch = text.match(pattern);
      if (nameMatch && nameMatch[1]) {
        const name = nameMatch[1].trim();
        // Validate name (not common words)
        const commonWords = ['resume', 'curriculum', 'vitae', 'cv', 'profile', 'summary', 'objective'];
        if (!commonWords.some(word => name.toLowerCase().includes(word)) && name.length > 3) {
          extracted.name = name;
          break;
        }
      }
    }
    
    // Extract location
    const locationPatterns = [
      /(?:Location|Address|City|Based in)\s*[:\-]\s*([A-Za-z\s,]+(?:,\s*[A-Z]{2})?)/i,
      /([A-Za-z\s]+,\s*[A-Z]{2}(?:\s+\d{5})?)/g, // City, State format
      /([A-Za-z\s]+,\s*[A-Za-z\s]+)/g // City, Country format
    ];
    
    for (const pattern of locationPatterns) {
      const locationMatch = text.match(pattern);
      if (locationMatch && locationMatch[1]) {
        const location = locationMatch[1].trim();
        if (location.length > 3 && location.length < 100) {
          extracted.location = location;
          break;
        }
      }
    }
    
    // Extract job role/title
    const rolePatterns = [
      /(?:Position|Role|Title|Job)\s*[:\-]\s*([A-Za-z\s]+)/i,
      /(Software Engineer|Developer|Manager|Designer|Analyst|Consultant|Architect|Lead|Senior|Junior|Principal)[A-Za-z\s]*/gi,
      /([A-Z][a-z]+\s+(?:Engineer|Developer|Manager|Designer|Analyst|Consultant|Architect))/g
    ];
    
    for (const pattern of rolePatterns) {
      const roleMatch = text.match(pattern);
      if (roleMatch && roleMatch[1]) {
        extracted.role = roleMatch[1].trim();
        break;
      }
    }
    
    // Extract years of experience
    const expPatterns = [
      /(\d+)\s*(?:\+)?\s*years?\s+(?:of\s+)?experience/i,
      /experience\s*[:\-]\s*(\d+)\s*years?/i,
      /(\d+)\s*years?\s+in/i
    ];
    
    for (const pattern of expPatterns) {
      const expMatch = text.match(pattern);
      if (expMatch && expMatch[1]) {
        extracted.experienceYears = parseInt(expMatch[1]);
        break;
      }
    }
    
    // Extract skills (basic approach)
    const skillsSection = text.match(/(?:Skills|Technologies|Tools)\s*[:\-]\s*([^\n]+(?:\n[^\n]*)*?)(?:\n\s*\n|\n[A-Z]|$)/i);
    if (skillsSection && skillsSection[1]) {
      const skillsText = skillsSection[1];
      const skills = skillsText
        .split(/[,;|\n]/)
        .map(s => s.trim())
        .filter(s => s.length > 1 && s.length < 30)
        .slice(0, 20); // Limit to 20 skills
      
      if (skills.length > 0) {
        extracted.skills = JSON.stringify(skills);
      }
    }
    
    // Extract education
    const educationPatterns = [
      /(?:Education|Degree|University|College)\s*[:\-]\s*([^\n]+(?:\n[^\n]*)*?)(?:\n\s*\n|\n[A-Z]|$)/i,
      /(Bachelor|Master|PhD|B\.S\.|M\.S\.|B\.A\.|M\.A\.)[^\n]+/i
    ];
    
    for (const pattern of educationPatterns) {
      const eduMatch = text.match(pattern);
      if (eduMatch && eduMatch[1]) {
        extracted.education = eduMatch[1].trim();
        break;
      }
    }
    
    return extracted;
  }

  /**
   * Find existing resume by email, phone, or LinkedIn
   */
  findExistingResume(email?: string, phone?: string, linkedin?: string): ResumeRecord | null {
    const conditions = [];
    const params: any = {};
    
    if (email) {
      conditions.push('email = @email');
      params.email = email.toLowerCase();
    }
    
    if (phone) {
      conditions.push('phone = @phone');
      params.phone = phone.replace(/[^\d+]/g, '');
    }
    
    if (linkedin) {
      conditions.push('linkedin = @linkedin');
      params.linkedin = linkedin;
    }
    
    if (conditions.length === 0) return null;
    
    const query = `SELECT * FROM resumes WHERE ${conditions.join(' OR ')} ORDER BY updatedAt DESC LIMIT 1`;
    const stmt = this.db.prepare(query);
    
    try {
      const result = stmt.get(params) as ResumeRecord | undefined;
      return result || null;
    } catch (error) {
      console.error('❌ Error finding existing resume:', error);
      return null;
    }
  }

  /**
   * Save or update resume data with analysis results
   */
  saveResume(
    resumeText: string, 
    analysisResults?: {
      atsScore?: number;
      atsBreakdown?: any;
      suggestions?: any[];
      jobProfiles?: any[];
    },
    fileInfo?: {
      fileType?: string;
      fileSize?: number;
      uploadSource?: string;
    }
  ): ResumeRecord {
    console.log('💾 Processing resume for database storage...');
    
    // Extract contact information
    const extracted = this.extractContactInfo(resumeText);
    
    console.log('📋 Extracted contact info:', {
      name: extracted.name,
      email: extracted.email,
      phone: extracted.phone,
      linkedin: extracted.linkedin,
      role: extracted.role
    });
    
    // Check for existing resume
    const existing = this.findExistingResume(extracted.email, extracted.phone, extracted.linkedin);
    
    // Ensure all required fields have values (not undefined)
    const resumeData: ResumeRecord = {
      name: extracted.name || null,
      email: extracted.email || null,
      phone: extracted.phone || null,
      linkedin: extracted.linkedin || null,
      location: extracted.location || null,
      role: extracted.role || null,
      experienceYears: extracted.experienceYears || null,
      skills: extracted.skills || null,
      education: extracted.education || null,
      resumeText,
      extractedData: JSON.stringify(extracted),
      atsScore: analysisResults?.atsScore || null,
      atsBreakdown: analysisResults?.atsBreakdown ? JSON.stringify(analysisResults.atsBreakdown) : null,
      analysisResults: analysisResults ? JSON.stringify(analysisResults) : null,
      fileType: fileInfo?.fileType || null,
      fileSize: fileInfo?.fileSize || null,
      uploadSource: fileInfo?.uploadSource || 'web',
      updatedAt: new Date().toISOString()
    };
    
    if (existing) {
      // Update existing record
      console.log(`🔄 Updating existing resume record (ID: ${existing.id})`);
      
      const updateStmt = this.db.prepare(`
        UPDATE resumes SET 
          name = COALESCE(@name, name),
          email = COALESCE(@email, email),
          phone = COALESCE(@phone, phone),
          linkedin = COALESCE(@linkedin, linkedin),
          location = COALESCE(@location, location),
          role = COALESCE(@role, role),
          experienceYears = COALESCE(@experienceYears, experienceYears),
          skills = COALESCE(@skills, skills),
          education = COALESCE(@education, education),
          resumeText = @resumeText,
          extractedData = @extractedData,
          atsScore = COALESCE(@atsScore, atsScore),
          atsBreakdown = COALESCE(@atsBreakdown, atsBreakdown),
          analysisResults = COALESCE(@analysisResults, analysisResults),
          fileType = COALESCE(@fileType, fileType),
          fileSize = COALESCE(@fileSize, fileSize),
          uploadSource = COALESCE(@uploadSource, uploadSource),
          updatedAt = @updatedAt
        WHERE id = @id
      `);
      
      updateStmt.run({
        ...resumeData,
        id: existing.id
      });
      
      // Return updated record
      const getStmt = this.db.prepare('SELECT * FROM resumes WHERE id = ?');
      return getStmt.get(existing.id) as ResumeRecord;
      
    } else {
      // Insert new record
      console.log('✨ Creating new resume record');
      
      const insertStmt = this.db.prepare(`
        INSERT INTO resumes (
          name, email, phone, linkedin, location, role, experienceYears, 
          skills, education, resumeText, extractedData, atsScore, atsBreakdown,
          analysisResults, fileType, fileSize, uploadSource, updatedAt
        ) VALUES (
          @name, @email, @phone, @linkedin, @location, @role, @experienceYears,
          @skills, @education, @resumeText, @extractedData, @atsScore, @atsBreakdown,
          @analysisResults, @fileType, @fileSize, @uploadSource, @updatedAt
        )
      `);
      
      const result = insertStmt.run(resumeData);
      
      // Return inserted record
      const getStmt = this.db.prepare('SELECT * FROM resumes WHERE id = ?');
      return getStmt.get(result.lastInsertRowid) as ResumeRecord;
    }
  }

  /**
   * Get all resumes (for future admin use)
   */
  getAllResumes(limit = 100, offset = 0): ResumeRecord[] {
    const stmt = this.db.prepare('SELECT * FROM resumes ORDER BY updatedAt DESC LIMIT ? OFFSET ?');
    return stmt.all(limit, offset) as ResumeRecord[];
  }

  /**
   * Get resume statistics
   */
  getStats() {
    const totalStmt = this.db.prepare('SELECT COUNT(*) as total FROM resumes');
    const recentStmt = this.db.prepare("SELECT COUNT(*) as recent FROM resumes WHERE updatedAt > datetime('now', '-7 days')");
    const avgScoreStmt = this.db.prepare('SELECT AVG(atsScore) as avgScore FROM resumes WHERE atsScore IS NOT NULL');
    
    const total = totalStmt.get() as { total: number };
    const recent = recentStmt.get() as { recent: number };
    const avgScore = avgScoreStmt.get() as { avgScore: number };
    
    return {
      totalResumes: total.total,
      recentUploads: recent.recent,
      averageATSScore: avgScore.avgScore ? Math.round(avgScore.avgScore) : 0
    };
  }

  /**
   * Get comprehensive resume data for admin purposes
   */
  getResumeById(id: number): ResumeRecord | null {
    const stmt = this.db.prepare('SELECT * FROM resumes WHERE id = ?');
    return stmt.get(id) as ResumeRecord || null;
  }

  /**
   * Get resumes by email for user history
   */
  getResumesByEmail(email: string): ResumeRecord[] {
    const stmt = this.db.prepare('SELECT * FROM resumes WHERE email = ? ORDER BY updatedAt DESC');
    return stmt.all(email.toLowerCase()) as ResumeRecord[];
  }

  /**
   * Get top performing resumes by ATS score
   */
  getTopResumes(limit = 10): ResumeRecord[] {
    const stmt = this.db.prepare('SELECT * FROM resumes WHERE atsScore IS NOT NULL ORDER BY atsScore DESC LIMIT ?');
    return stmt.all(limit) as ResumeRecord[];
  }

  /**
   * Close database connection
   */
  close() {
    this.db.close();
  }
}

// Singleton instance
export const db = new DatabaseService();

// Graceful shutdown
process.on('exit', () => db.close());
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});
process.on('SIGTERM', () => {
  db.close();
  process.exit(0);
});
