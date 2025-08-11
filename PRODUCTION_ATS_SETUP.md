# 🚀 Production ATS Scoring Setup Guide

## 📋 **Overview**
This guide ensures that the ATS scoring feature works properly on your production server. The system includes both AI-powered scoring and fallback rule-based scoring for reliability.

## 🔑 **Required Environment Variables**

### **For Render Backend (.env file)**
```bash
# AI Configuration (GROQ - Recommended)
AI_PROVIDER=groq
AI_MODEL=llama3-8b-8192
GROQ_API_KEY=your_actual_groq_api_key_here

# Function-specific models
AI_PROVIDER_RESUME=groq
AI_MODEL_RESUME=llama3-8b-8192
AI_PROVIDER_ATS=groq
AI_MODEL_ATS=llama3-8b-8192

# Feature toggles
ENABLE_RESUME_ANALYSIS=true
ENABLE_ATS_SCORING=true
ENABLE_CONTENT_IMPROVEMENT=true
ENABLE_CHAT_ASSISTANT=true
ENABLE_JOB_SEARCH=true

# Pricing
PRICE_INR=49
FREE_TIER_LIMIT=1

# Payment
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 🛠️ **Setup Steps**

### **1. Get Groq API Key**
1. Go to [Groq Console](https://console.groq.com/)
2. Sign up/Login
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `gsk_`)

### **2. Configure Render Environment**
1. Go to your Render dashboard
2. Select your backend service (`resume-checker-api`)
3. Go to Environment tab
4. Add these variables:
   - `GROQ_API_KEY` = your Groq API key
   - `AI_PROVIDER` = groq
   - `AI_MODEL` = llama3-8b-8192
   - `ENABLE_ATS_SCORING` = true

### **3. Test ATS Scoring**
1. Deploy your backend
2. Upload a resume through your frontend
3. Check the backend logs for ATS scoring messages
4. Verify the score appears in the frontend

## 🔍 **How ATS Scoring Works**

### **Primary Method: AI-Powered Scoring**
- Uses Groq's Llama 3 model for intelligent analysis
- Provides detailed section-by-section scoring
- Generates personalized improvement suggestions
- Matches resume to relevant job profiles

### **Fallback Method: Rule-Based Scoring**
- Activates automatically if AI fails
- Uses predefined rules and patterns
- Analyzes keywords, formatting, and structure
- Provides basic scoring and suggestions

## 📊 **Expected ATS Score Structure**

```json
{
  "score": 85,
  "breakdown": {
    "keywords": 90,
    "formatting": 85,
    "experience": 80,
    "skills": 90,
    "achievements": 75,
    "contactInfo": 70,
    "certifications": 0,
    "languages": 0,
    "projects": 60,
    "volunteerWork": 0
  },
  "suggestions": [
    {
      "category": "keywords",
      "issue": "Missing industry-specific keywords",
      "suggestion": "Add keywords like 'Agile', 'CI/CD', 'Cloud Computing'",
      "impact": 8
    }
  ],
  "jobProfiles": [
    {
      "title": "Senior Software Engineer",
      "matchScore": 85,
      "reasoning": "Strong technical skills, relevant experience, good project portfolio"
    }
  ]
}
```

## 🚨 **Troubleshooting**

### **ATS Score Not Appearing**
1. Check backend logs for ATS scoring messages
2. Verify `GROQ_API_KEY` is set correctly
3. Ensure `ENABLE_ATS_SCORING=true`
4. Check if fallback scoring is working

### **AI Service Errors**
1. Verify Groq API key is valid
2. Check Groq service status
3. Ensure model name is correct
4. Check rate limits

### **Fallback Scoring Issues**
1. Check backend logs for fallback messages
2. Verify text extraction is working
3. Check database connectivity

## 📝 **Log Messages to Monitor**

### **Successful AI Scoring**
```
[ATS Score] Starting analysis with provider: groq, model: llama3-8b-8192
[ATS Score] AI analysis completed successfully
[ATS Score] Final score: 85
```

### **Fallback Scoring**
```
[ATS Score] AI analysis failed, using fallback scoring...
[FallbackATS] Using fallback scoring for resume analysis
[FallbackATS] Calculated score: 75
```

### **Errors**
```
[ATS Score] No valid API key configured
[ATS Score] Authentication failed - check API key
[ATS Score] Rate limit reached
```

## 🔄 **Deployment Checklist**

- [ ] Groq API key configured in Render
- [ ] Environment variables set correctly
- [ ] Backend deployed successfully
- [ ] ATS scoring tested with sample resume
- [ ] Fallback scoring verified
- [ ] Frontend displays scores correctly
- [ ] Payment integration working

## 💡 **Performance Tips**

1. **Use Llama 3 8B model** for faster responses
2. **Enable fallback scoring** for reliability
3. **Monitor API usage** to avoid rate limits
4. **Cache results** for repeated analyses

## 🆘 **Support**

If you encounter issues:
1. Check the backend logs in Render
2. Verify environment variables
3. Test with a simple text resume
4. Check Groq service status

---

**Your ATS scoring system is now production-ready with both AI and fallback capabilities!** 🎯
