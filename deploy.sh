#!/bin/bash

echo "🚀 Resume Checker Deployment Script"
echo "=================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Initialize git repositories if not already done
echo "📁 Setting up Git repositories..."

# Backend setup
if [ ! -d "server/.git" ]; then
    echo "🔧 Initializing backend Git repository..."
    cd server
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Backend Git repository initialized"
    cd ..
else
    echo "✅ Backend Git repository already exists"
fi

# Frontend setup
if [ ! -d "client/.git" ]; then
    echo "🔧 Initializing frontend Git repository..."
    cd client
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Frontend Git repository initialized"
    cd ..
else
    echo "✅ Frontend Git repository already exists"
fi

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. 📤 Push your code to GitHub:"
echo "   - Create a new repository on GitHub"
echo "   - Add the remote origin and push your code"
echo ""
echo "2. 🚀 Deploy Backend to Render:"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repository"
echo "   - Use root directory: ./server"
echo "   - Build command: npm install && npm run build"
echo "   - Start command: npm start"
echo ""
echo "3. 🌐 Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Root directory: ./client"
echo "   - Framework: Next.js"
echo ""
echo "4. ⚙️  Set Environment Variables:"
echo "   - Copy from env.production files"
echo "   - Update with your actual API keys"
echo "   - Set CORS_ORIGIN to your frontend URL"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "🎉 Good luck with your deployment!"
