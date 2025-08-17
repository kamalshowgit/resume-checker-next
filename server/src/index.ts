import express, { json, urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import resumeRouter from './routes/resume';
import payRouter from './routes/pay';
import adminRouter from './routes/admin';
import { logAIConfiguration } from './lib/ai';

// Load .env file from the server directory (parent of src)
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Debug: Log environment variables after loading
console.log('=== Environment Variables Loaded ===');
console.log('ENABLE_RESUME_ANALYSIS:', process.env.ENABLE_RESUME_ANALYSIS);
console.log('ENABLE_ATS_SCORING:', process.env.ENABLE_ATS_SCORING);
console.log('ENABLE_CONTENT_IMPROVEMENT:', process.env.ENABLE_CONTENT_IMPROVEMENT);
console.log('ENABLE_CHAT_ASSISTANT:', process.env.ENABLE_CHAT_ASSISTANT);
console.log('ENABLE_JOB_SEARCH:', process.env.ENABLE_JOB_SEARCH);
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

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/resume', resumeRouter);
app.use('/api/pay', payRouter);
app.use('/api/admin', adminRouter);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log('server listening on http://localhost:' + port);
  logAIConfiguration();
});
