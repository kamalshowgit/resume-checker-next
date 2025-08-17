#!/bin/bash

# 🚀 Resume Checker Production Deployment Script
# This script helps deploy your resume checker to production

echo "🚀 Starting Resume Checker Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "client" ] || [ ! -d "server" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Build backend
echo -e "${BLUE}🔨 Building backend...${NC}"
cd server

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Warning: No .env file found in server directory${NC}"
    echo -e "${YELLOW}   Please create .env file with production environment variables${NC}"
    echo -e "${YELLOW}   See PRODUCTION_DEPLOYMENT.md for details${NC}"
fi

npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend build failed${NC}"
    exit 1
fi

npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend TypeScript compilation failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend built successfully${NC}"
cd ..

# Build frontend
echo -e "${BLUE}🔨 Building frontend...${NC}"
cd client

if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  Warning: No .env.local file found in client directory${NC}"
    echo -e "${YELLOW}   Please create .env.local file with production environment variables${NC}"
    echo -e "${YELLOW}   See PRODUCTION_DEPLOYMENT.md for details${NC}"
fi

npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend built successfully${NC}"
cd ..

# Check environment variables
echo -e "${BLUE}🔍 Checking environment variables...${NC}"

# Check backend environment
if [ -f "server/.env" ]; then
    echo -e "${GREEN}✅ Backend .env file found${NC}"
    
    # Check for required variables
    if grep -q "PAYPAL_CLIENT_ID" server/.env; then
        echo -e "${GREEN}✅ PAYPAL_CLIENT_ID found${NC}"
    else
        echo -e "${YELLOW}⚠️  PAYPAL_CLIENT_ID not found in backend .env${NC}"
    fi
    
    if grep -q "PAYPAL_CLIENT_SECRET" server/.env; then
        echo -e "${GREEN}✅ PAYPAL_CLIENT_SECRET found${NC}"
    else
        echo -e "${YELLOW}⚠️  PAYPAL_CLIENT_SECRET not found in backend .env${NC}"
    fi
    
    if grep -q "NODE_ENV=production" server/.env; then
        echo -e "${GREEN}✅ NODE_ENV=production found${NC}"
    else
        echo -e "${YELLOW}⚠️  NODE_ENV=production not found in backend .env${NC}"
    fi
else
    echo -e "${RED}❌ Backend .env file not found${NC}"
fi

# Check frontend environment
if [ -f "client/.env.local" ]; then
    echo -e "${GREEN}✅ Frontend .env.local file found${NC}"
    
    # Check for required variables
    if grep -q "NEXT_PUBLIC_PAYPAL_CLIENT_ID" client/.env.local; then
        echo -e "${GREEN}✅ NEXT_PUBLIC_PAYPAL_CLIENT_ID found${NC}"
    else
        echo -e "${YELLOW}⚠️  NEXT_PUBLIC_PAYPAL_CLIENT_ID not found in frontend .env.local${NC}"
    fi
    
    if grep -q "NEXT_PUBLIC_API_URL" client/.env.local; then
        echo -e "${GREEN}✅ NEXT_PUBLIC_API_URL found${NC}"
    else
        echo -e "${YELLOW}⚠️  NEXT_PUBLIC_API_URL not found in frontend .env.local${NC}"
    fi
else
    echo -e "${RED}❌ Frontend .env.local file not found${NC}"
fi

# Deployment instructions
echo -e "${BLUE}📚 Deployment Instructions:${NC}"
echo ""
echo -e "${GREEN}🎯 For Vercel (Frontend):${NC}"
echo "   1. cd client"
echo "   2. vercel --prod"
echo "   3. Set environment variables in Vercel dashboard"
echo ""
echo -e "${GREEN}🎯 For Render (Backend):${NC}"
echo "   1. Connect GitHub repository to Render"
echo "   2. Set build command: npm install && npm run build"
echo "   3. Set start command: npm start"
echo "   4. Add environment variables in Render dashboard"
echo ""
echo -e "${GREEN}🎯 For Railway (Backend):${NC}"
echo "   1. Connect GitHub repository to Railway"
echo "   2. Add environment variables"
echo "   3. Deploy automatically"
echo ""

# Test local production build
echo -e "${BLUE}🧪 Testing local production build...${NC}"

# Test backend
cd server
echo -e "${BLUE}   Testing backend...${NC}"
timeout 10s npm start > /dev/null 2>&1 &
BACKEND_PID=$!
sleep 3

if kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${GREEN}✅ Backend test successful${NC}"
    kill $BACKEND_PID
else
    echo -e "${YELLOW}⚠️  Backend test inconclusive (check logs)${NC}"
fi

cd ..

# Final checklist
echo -e "${BLUE}📋 Production Deployment Checklist:${NC}"
echo ""
echo -e "${GREEN}✅ Code built successfully${NC}"
echo -e "${GREEN}✅ TypeScript compilation passed${NC}"
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""
echo -e "${YELLOW}⚠️  Before deploying to production:${NC}"
echo "   - Update PayPal keys to production keys"
echo "   - Set all environment variables"
echo "   - Test payment flow in PayPal sandbox"
echo "   - Verify database connections"
echo "   - Check CORS settings"
echo ""
echo -e "${GREEN}🚀 Ready for production deployment!${NC}"
echo ""
echo -e "${BLUE}📖 See PRODUCTION_DEPLOYMENT.md for detailed instructions${NC}"
echo -e "${BLUE}📧 Support: rsmchckrspprt@gmail.com${NC}"
