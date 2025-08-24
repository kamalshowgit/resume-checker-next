import express, { json, urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import resumeRouter from './routes/resume';
import adminRouter from './routes/admin';
import { logAIConfiguration } from './lib/ai';
import { db } from './lib/database';

// Load .env file from the server directory (parent of src)
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Debug: Log environment variables after loading
console.log('=== Environment Variables Loaded ===');
console.log('ENABLE_RESUME_ANALYSIS:', process.env.ENABLE_RESUME_ANALYSIS);
console.log('ENABLE_ATS_SCORING:', process.env.ENABLE_ATS_SCORING);
console.log('ENABLE_CONTENT_IMPROVEMENT:', process.env.ENABLE_CONTENT_IMPROVEMENT);
console.log('ENABLE_CHAT_ASSISTANT:', process.env.ENABLE_CHAT_ASSISTANT);
console.log('ENABLE_JOB_SEARCH:', process.env.ENABLE_JOB_SEARCH);
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '***SET***' : 'NOT SET');
console.log('===================================');

// CORS configuration with multiple origins support
const corsOrigins = (() => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.CORS_ORIGIN) {
      // Support comma-separated CORS origins
      return process.env.CORS_ORIGIN.split(',').map(origin => origin.trim());
    }
    if (process.env.APP_URL) {
      // Support comma-separated APP_URL for CORS
      return process.env.APP_URL.split(',').map(url => url.trim());
    }
    // Fallback to common production domains
    return ['https://resumecheckerai.info', 'https://www.resumecheckerai.info'];
  }
  
  // Development - allow all origins
  return ['*'];
})();

console.log('🌐 CORS Origins configured:', corsOrigins);

const app = express();
app.use(cors({ 
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(json({ limit: '5mb' }));
app.use(urlencoded({ extended: true }));

app.get('/health', async (_req, res) => {
  try {
    // Check database connection and get stats
    const stats = db.getStats();
    res.json({ 
      ok: true, 
      status: 'healthy',
      database: 'connected',
      stats: {
        totalResumes: stats.totalResumes,
        recentUploads: stats.recentUploads
      },
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({ 
      ok: false, 
      status: 'unhealthy',
      database: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Public debug endpoint for production monitoring (no auth required)
app.get('/debug-data', (_req, res) => {
  try {
    const stats = db.getStats();
    const recentResumes = db.getAllResumes(5, 0); // Get last 5 resumes
    
    res.json({
      success: true,
      status: 'operational',
      database: 'connected',
      stats: {
        totalResumes: stats.totalResumes,
        recentUploads: stats.recentUploads
      },
      recentResumes: recentResumes.map(r => ({
        id: r.id,
        name: r.name,
        email: r.email,
        role: r.role,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
      })),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

app.use('/api/resume', resumeRouter);
app.use('/api/admin', adminRouter);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log('server listening on http://localhost:' + port);
  logAIConfiguration();
});
