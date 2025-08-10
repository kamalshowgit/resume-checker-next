# Resume Checker - Full-Stack AI Application

A comprehensive resume analysis and optimization tool with AI-powered insights, built with Next.js frontend and Express.js backend.

## 🚀 Features

- **AI-Powered Resume Analysis**: Get detailed insights and scoring for your resume
- **ATS Optimization**: Improve your resume's compatibility with Applicant Tracking Systems
- **Content Improvement**: Receive suggestions to enhance your resume content
- **Chat Assistant**: Interactive AI chat for career advice and resume questions
- **Payment Integration**: Razorpay integration for premium features
- **Real-time Server Status**: Monitor backend connectivity

## 🏗️ Architecture

```
├── client/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # React components
│   │   └── lib/          # Utility libraries and services
│   └── package.json
├── server/                # Express.js backend API
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── lib/          # Business logic and AI services
│   │   └── index.ts      # Server entry point
│   └── package.json
└── package.json           # Root package.json for development
```

## 🛠️ Tech Stack

### Frontend (Client)
- **Next.js 15** - React framework with app router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication

### Backend (Server)
- **Express.js 5** - Node.js web framework
- **TypeScript** - Type-safe development
- **SQLite** - Lightweight database
- **Groq AI** - AI service integration
- **Razorpay** - Payment processing

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq AI API key
- Razorpay account (for payments)

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd resume-checker
npm run install:all
```

### 2. Environment Setup

#### Client Environment (.env.local)
```bash
cd client
# Create .env.local with:
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_AI_PROVIDER=groq
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key
```

#### Server Environment (.env)
```bash
cd server
# Create .env with:
PORT=4000
CORS_ORIGIN=http://localhost:3000
GROQ_API_KEY=your_groq_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 3. Start Development Servers

```bash
# Start both client and server concurrently
npm run dev

# Or start them separately:
npm run dev:server    # Backend on port 4000
npm run dev:client    # Frontend on port 3000
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run dev:server` - Start only the backend server
- `npm run dev:client` - Start only the frontend client
- `npm run build` - Build the frontend for production
- `npm run install:all` - Install dependencies for all packages

### API Endpoints

#### Resume Analysis
- `POST /api/resume/upload` - Upload and analyze resume
- `POST /api/resume/chat` - Chat with AI about resume

#### Payment
- `POST /api/pay/create-order` - Create payment order
- `POST /api/pay/verify` - Verify payment

#### Health
- `GET /health` - Server health check

## 🔌 Integration Features

### 1. **Unified API Service Layer**
- Centralized API communication through `apiService`
- Automatic error handling and retry logic
- Request/response interceptors for logging
- Health check monitoring

### 2. **Real-time Server Status**
- Visual indicator of backend connectivity
- Automatic status checking every 30 seconds
- Manual retry functionality
- User-friendly status display

### 3. **Environment-based Configuration**
- Separate environment files for client and server
- Feature flags for enabling/disabling functionality
- Configurable AI providers and API keys

### 4. **Error Handling & Fallbacks**
- Graceful degradation when backend is unavailable
- User-friendly error messages
- Automatic retry mechanisms
- Comprehensive logging

## 🧪 Testing the Integration

1. **Start both servers**: `npm run dev`
2. **Check server status**: Look for the status indicator in the header
3. **Upload a resume**: Test the file upload and analysis
4. **Chat with AI**: Test the chat functionality
5. **Monitor logs**: Check both client and server console outputs

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Ensure ports 3000 (client) and 4000 (server) are available
   - Check if other services are using these ports

2. **CORS Errors**
   - Verify `CORS_ORIGIN` in server `.env` matches client URL
   - Check browser console for CORS-related errors

3. **API Connection Issues**
   - Verify server is running on port 4000
   - Check server status indicator in header
   - Review server console for errors

4. **Environment Variables**
   - Ensure `.env` files are in correct locations
   - Verify variable names match exactly
   - Restart servers after environment changes

### Debug Mode

Enable detailed logging by setting environment variables:
```bash
DEBUG=* npm run dev
```

## 📚 API Documentation

For detailed API documentation, see the server routes in `server/src/routes/`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the integration
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
