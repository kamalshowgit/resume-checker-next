# 🚀 AI Configuration Setup Guide

## Quick Start

1. **Copy the environment template:**
   ```bash
   cp env.example .env
   ```

2. **Edit your .env file with your Groq API key:**
   ```bash
   nano .env
   # or
   code .env
   ```

3. **Set your Groq API key and model:**
   ```env
   GROQ_API_KEY=gsk_your_actual_api_key_here
   AI_MODEL=llama-3.1-8b-instant
   AI_PROVIDER=groq
   ```

4. **Restart your server:**
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables Explained

### Core AI Configuration
```env
# Set your preferred AI provider
AI_PROVIDER=groq

# Your Groq API key
GROQ_API_KEY=gsk_your_api_key_here

# Default model for all functions
AI_MODEL=llama-3.1-8b-instant
```

### Function-Specific Models (Optional)
```env
# Override models for specific functions
AI_MODEL_RESUME=llama-3.3-70b-versatile      # Better quality for resume analysis
AI_MODEL_CHAT=llama-3.1-8b-instant           # Faster for chat responses
AI_MODEL_ATS=llama-3.3-70b-versatile         # Better for ATS scoring
AI_MODEL_IMPROVEMENT=llama-3.3-70b-versatile # Better for content improvement
AI_MODEL_JOBSEARCH=llama-3.1-8b-instant      # Faster for job search
```

### Alternative AI Providers
```env
# OpenAI
OPENAI_API_KEY=sk-your_openai_key
AI_PROVIDER=openai
AI_MODEL=gpt-3.5-turbo

# Anthropic
ANTHROPIC_API_KEY=sk-ant-your_key
AI_PROVIDER=anthropic
AI_MODEL=claude-3-haiku-20240307

# OpenRouter
OPENROUTER_API_KEY=your_key
AI_PROVIDER=openrouter
AI_MODEL=meta-llama/llama-3-8b-instruct:free
```

## 📚 Available Groq Models

| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| `llama3-8b-8192` | ⚡ Fast | 🟡 Good | 💰 Low | General use, chat |
| `llama3-70b-8192` | 🐌 Slow | 🟢 Excellent | 💰 Medium | Resume analysis, ATS |
| `mixtral-8x7b-32768` | 🟡 Medium | 🟢 Very Good | 💰 Low | Balanced performance |
| `gemma2-9b-it` | ⚡ Fast | 🟡 Good | 💰 Low | Quick responses |

## 🎯 Function-Specific Configuration

### Resume Analysis (`/upload`, `/analyze`)
- **Provider**: `AI_PROVIDER_RESUME` or `AI_PROVIDER`
- **Model**: `AI_MODEL_RESUME` or `AI_MODEL`
- **Use Case**: Text extraction, key points, ATS scoring

### Chat Assistant (`/chat`)
- **Provider**: `AI_PROVIDER_CHAT` or `AI_PROVIDER`
- **Model**: `AI_MODEL_CHAT` or `AI_MODEL`
- **Use Case**: Career advice, resume tips

### ATS Analysis (`/ats-analysis`)
- **Provider**: `AI_PROVIDER_RESUME` or `AI_PROVIDER`
- **Model**: `AI_MODEL_ATS` or `AI_MODEL`
- **Use Case**: Detailed ATS scoring and suggestions

### Content Improvement (`/improve`)
- **Provider**: `AI_PROVIDER_RESUME` or `AI_PROVIDER`
- **Model**: `AI_MODEL_IMPROVEMENT` or `AI_MODEL`
- **Use Case**: Rewriting resume sections

### Job Search (`/job-search`)
- **Provider**: `AI_PROVIDER_JOBSEARCH` or `AI_PROVIDER`
- **Model**: `AI_MODEL_JOBSEARCH` or `AI_MODEL`
- **Use Case**: Job recommendations and search

## 🧪 Testing Your Configuration

### 1. Test Basic AI Integration
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"text":"Software Engineer with 5 years experience in JavaScript and React"}' \
  http://localhost:4000/api/resume/analyze
```

### 2. Test ATS Analysis
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"text":"Experienced developer with strong technical skills"}' \
  http://localhost:4000/api/resume/ats-analysis
```

### 3. Test Chat Assistant
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"history":[],"message":"How can I improve my resume?"}' \
  http://localhost:4000/api/resume/chat
```

### 4. Test Content Improvement
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"text":"I am a developer","category":"experience"}' \
  http://localhost:4000/api/resume/improve
```

## 🔍 Troubleshooting

### Common Issues

1. **"No API key found" error**
   - Check if `.env` file exists
   - Verify `GROQ_API_KEY` is set correctly
   - Restart server after editing `.env`

2. **"API Error" responses**
   - Verify API key is valid
   - Check Groq account has credits
   - Ensure model name is correct

3. **Slow responses**
   - Use `llama3-8b-8192` for faster responses
   - Check your internet connection
   - Consider using function-specific models

### Debug Commands

```bash
# Check environment variables
grep GROQ_API_KEY .env

# Check server logs
npm run dev

# Test API key validity
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.groq.com/openai/v1/models
```

## 🔄 Switching AI Providers

### From Groq to OpenAI
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your_openai_key
AI_MODEL=gpt-3.5-turbo
# Comment out or remove GROQ_API_KEY
# GROQ_API_KEY=gsk_your_key
```

### From Groq to Anthropic
```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-your_key
AI_MODEL=claude-3-haiku-20240307
# Comment out or remove GROQ_API_KEY
# GROQ_API_KEY=gsk_your_key
```

## 💡 Best Practices

1. **Start with Groq**: Fast, cost-effective, good quality
2. **Use function-specific models**: Balance speed vs quality per function
3. **Monitor API usage**: Check Groq dashboard for usage and costs
4. **Fallback handling**: System gracefully falls back to heuristic methods if AI fails
5. **Environment separation**: Use different models for development vs production

## 📞 Support

- **Groq Documentation**: https://console.groq.com/docs
- **API Status**: https://status.groq.com
- **Model Comparison**: https://console.groq.com/docs/models
