# 🤖 AI Configuration Guide

## Quick Setup

Copy this configuration to your `.env` file in the server directory:

```bash
# ===================================
# RESUME CHECKER - AI CONFIGURATION
# ===================================

# ===================================
# SERVER CONFIGURATION
# ===================================
PORT=4000
CORS_ORIGIN=http://localhost:5173

# ===================================
# GLOBAL AI CONFIGURATION (Fallback)
# ===================================
AI_PROVIDER=groq
AI_MODEL=llama3-8b-8192

# ===================================
# FEATURE-SPECIFIC AI CONFIGURATION
# ===================================
# Configure different AI models for different features

# RESUME ANALYSIS (Key Points Extraction)
AI_PROVIDER_RESUME=groq
AI_MODEL_RESUME=llama3-8b-8192

# CHAT ASSISTANT (Resume Coaching)
AI_PROVIDER_CHAT=groq
AI_MODEL_CHAT=llama3-8b-8192

# JOB SEARCH (Future Feature)
AI_PROVIDER_JOBSEARCH=groq
AI_MODEL_JOBSEARCH=llama3-8b-8192

# ===================================
# AI PROVIDER API KEYS
# ===================================

# GROQ (Recommended - Fast & Free tier available)
GROQ_API_KEY=your_groq_api_key_here

# Uncomment the provider you want to use:
# OPENAI_API_KEY=your_openai_api_key_here
# OPENROUTER_API_KEY=your_openrouter_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
# TOGETHER_API_KEY=your_together_api_key_here
# HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# ===================================
# PAYMENT CONFIGURATION
# ===================================
PRICE_INR=49
# RAZORPAY_KEY_ID=your_razorpay_key_id
# RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 🎯 Feature-Specific Configuration

Your app has **3 main AI features** that you can configure independently:

### 1. **Resume Analysis** (`AI_PROVIDER_RESUME` / `AI_MODEL_RESUME`)
- **What it does**: Extracts key bullet points from uploaded resumes
- **Recommended**: `groq` + `llama3-70b-8192` for better analysis
- **Fallback**: Uses keyword-based extraction if no API key

### 2. **Chat Assistant** (`AI_PROVIDER_CHAT` / `AI_MODEL_CHAT`)  
- **What it does**: Provides resume improvement suggestions and coaching
- **Recommended**: `anthropic` + `claude-3-haiku-20240307` for conversational quality
- **Fallback**: Returns pre-written tips if no API key

### 3. **Job Search** (`AI_PROVIDER_JOBSEARCH` / `AI_MODEL_JOBSEARCH`)
- **What it does**: Future feature for AI-enhanced job matching
- **Currently**: Uses basic web search with Tavily API
- **Future**: Will use AI for better job recommendations

## 🔧 Quick Configuration Changes

To change which AI model handles which feature, just update these variables in your `.env` file:

### Use Different Models for Different Features:
```bash
# Fast model for resume analysis
AI_PROVIDER_RESUME=groq
AI_MODEL_RESUME=llama3-8b-8192

# High-quality model for chat
AI_PROVIDER_CHAT=openai  
AI_MODEL_CHAT=gpt-4

# Cost-effective for job search
AI_PROVIDER_JOBSEARCH=groq
AI_MODEL_JOBSEARCH=mixtral-8x7b-32768
```

### Use Same Model for Everything:
```bash
# Use global config for all features
AI_PROVIDER=anthropic
AI_MODEL=claude-3-haiku-20240307
# Don't set feature-specific variables
```

## 🚀 Supported Providers & Models

| Provider | Best For | Free Tier | Recommended Models |
|----------|----------|-----------|-------------------|
| **Groq** | Speed, Getting Started | ✅ Yes | `llama3-8b-8192`, `llama3-70b-8192` |
| **OpenAI** | Quality, Reliability | ❌ Paid | `gpt-3.5-turbo`, `gpt-4` |
| **Anthropic** | Conversation, Safety | ❌ Paid | `claude-3-haiku-20240307` |
| **OpenRouter** | Model Variety | 🟡 Some Free | `meta-llama/llama-3-8b-instruct:free` |
| **Together** | Open Source | ❌ Paid | `meta-llama/Llama-2-7b-chat-hf` |
| **HuggingFace** | Experimentation | 🟡 Limited Free | `microsoft/DialoGPT-medium` |

## 📝 Environment Variables Reference

### Core Variables You'll Change:

| Variable | What It Controls | Example Values |
|----------|------------------|----------------|
| `AI_PROVIDER_RESUME` | Resume analysis AI | `groq`, `openai`, `anthropic` |
| `AI_MODEL_RESUME` | Resume analysis model | `llama3-8b-8192`, `gpt-4` |
| `AI_PROVIDER_CHAT` | Chat assistant AI | `groq`, `openai`, `anthropic` |
| `AI_MODEL_CHAT` | Chat assistant model | `claude-3-haiku-20240307` |
| `AI_PROVIDER_JOBSEARCH` | Job search AI (future) | `groq`, `openai` |
| `AI_MODEL_JOBSEARCH` | Job search model (future) | `mixtral-8x7b-32768` |

### API Keys (Get one for your chosen provider):

| Variable | Where to Get |
|----------|--------------|
| `GROQ_API_KEY` | https://console.groq.com/ |
| `OPENAI_API_KEY` | https://platform.openai.com/ |
| `ANTHROPIC_API_KEY` | https://console.anthropic.com/ |
| `OPENROUTER_API_KEY` | https://openrouter.ai/ |
| `TOGETHER_API_KEY` | https://api.together.xyz/ |
| `HUGGINGFACE_API_KEY` | https://huggingface.co/settings/tokens |

## 🔄 Hot-Swapping Models

**You can change AI models anytime without restarting the server!** Just:

1. Edit your `.env` file
2. Save the changes  
3. The next AI request will use the new configuration

**Example**: Switch from free Groq to premium OpenAI:
```bash
# Before (free)
AI_PROVIDER_CHAT=groq
AI_MODEL_CHAT=llama3-8b-8192

# After (premium) - just change and save!
AI_PROVIDER_CHAT=openai
AI_MODEL_CHAT=gpt-4
```

## ⚡ Recommended Configurations

### 🆓 **Free Tier Setup**
```bash
AI_PROVIDER=groq
AI_MODEL=llama3-8b-8192
GROQ_API_KEY=your_groq_key
```

### 💎 **Premium Quality Setup**  
```bash
AI_PROVIDER_RESUME=groq
AI_MODEL_RESUME=llama3-70b-8192
AI_PROVIDER_CHAT=anthropic
AI_MODEL_CHAT=claude-3-haiku-20240307
GROQ_API_KEY=your_groq_key
ANTHROPIC_API_KEY=your_anthropic_key
```

### ⚖️ **Balanced Setup**
```bash
AI_PROVIDER_RESUME=groq
AI_MODEL_RESUME=mixtral-8x7b-32768
AI_PROVIDER_CHAT=openai
AI_MODEL_CHAT=gpt-3.5-turbo
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
```

## 🐛 Troubleshooting

**No AI responses?**
- Check your API key is valid
- Verify the model name is correct for your provider
- Look at server logs for error messages

**Want to test without API keys?**
- The app works with fallback methods
- Resume analysis uses keyword extraction
- Chat returns helpful pre-written tips

**Mixed providers not working?**
- Each feature needs its provider's API key
- Example: Using OpenAI for chat requires `OPENAI_API_KEY`
