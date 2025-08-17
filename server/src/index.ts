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

const app = express();
app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN || process.env.APP_URL || 'https://your-domain.com'
    : '*'
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
