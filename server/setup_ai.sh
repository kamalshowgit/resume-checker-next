#!/bin/bash

echo "🚀 Setting up AI Configuration for Resume Checker"
echo "=================================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created!"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🔑 Please edit your .env file with your Groq API key:"
echo "   nano .env"
echo "   # or"
echo "   code .env"
echo ""
echo "📋 Key things to set:"
echo "   - GROQ_API_KEY=your_actual_groq_api_key"
echo "   - AI_PROVIDER=groq (or change to other providers)"
echo "   - AI_MODEL=llama3-8b-8192 (or other Groq models)"
echo ""
echo "🔄 After editing .env, restart your server:"
echo "   npm run dev"
echo ""
echo "🧪 Test the AI integration:"
echo "   curl -X POST -H 'Content-Type: application/json' \\"
echo "     -d '{\"text\":\"Software Engineer with 5 years experience in JavaScript and React\"}' \\"
echo "     http://localhost:4000/api/resume/analyze"
echo ""
echo "📚 Available Groq Models:"
echo "   - llama3-8b-8192 (default, fast, cost-effective)"
echo "   - llama3-70b-8192 (better quality, slower)"
echo "   - mixtral-8x7b-32768 (balanced)"
echo "   - gemma2-9b-it (Google's model)"
echo ""
echo "🎯 Function-specific models you can set:"
echo "   - AI_MODEL_RESUME=llama3-8b-8192"
echo "   - AI_MODEL_CHAT=llama3-8b-8192"
echo "   - AI_MODEL_ATS=llama3-8b-8192"
echo "   - AI_MODEL_IMPROVEMENT=llama3-8b-8192"
