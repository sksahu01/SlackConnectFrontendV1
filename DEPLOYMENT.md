# Deployment Guide for SlackConnect Frontend

This guide covers deploying your SlackConnect frontend to Netlify and setting up proper OAuth configurations.

## 🌐 Deployment Environments

### Production (Netlify)
- **Frontend URL**: https://slackconnectfrontendv1.netlify.app
- **Backend URL**: https://slackconnectbackendv1.onrender.com

### Local Development
- **Frontend URL**: http://localhost:3002 (or ngrok tunnel)
- **Backend URL**: https://slackconnectbackendv1.onrender.com/api

## 🚀 Netlify Deployment

### Automatic Deployment (Recommended)
1. Connect your GitHub repository to Netlify
2. Set the build command: `npm run build`
3. Set the publish directory: `out`
4. Environment variables will be set automatically via `netlify.toml`

### Manual Deployment
```bash
# Build for Netlify
npm run build:netlify

# Deploy the 'out' folder to Netlify
```

## 🔐 Slack App Configuration

### OAuth & Permissions
Update your Slack app at https://api.slack.com/apps with these URLs:

#### Production OAuth Redirect URLs:
- **Success**: `https://slackconnectfrontendv1.netlify.app/auth/success`
- **Error**: `https://slackconnectfrontendv1.netlify.app/auth/error`

#### Local Development OAuth Redirect URLs (with ngrok):
- **Success**: `https://your-ngrok-url.ngrok.io/auth/success`
- **Error**: `https://your-ngrok-url.ngrok.io/auth/error`

### Required OAuth Scopes
Make sure your Slack app has these scopes:
- `channels:read` - List public channels
- `groups:read` - List private channels
- `chat:write` - Send messages
- `chat:write.public` - Send messages to channels the app isn't in

## 🛠️ Local Development Setup

### 1. Start with Ngrok Tunnel
```bash
npm run dev:tunnel
```

### 2. Update Slack App OAuth URLs
Use the ngrok HTTPS URL displayed in the terminal for your Slack app OAuth configuration.

### 3. Test Authentication Flow
1. Visit your ngrok URL
2. Click "Connect to Slack"
3. Complete OAuth flow
4. Should redirect back to your local app

## 📝 Environment Variables

### Production (.env variables on Netlify)
```bash
NEXT_PUBLIC_BACKEND_URL=https://slackconnectbackendv1.onrender.com/api
NEXT_PUBLIC_SLACK_CLIENT_ID=9312608562228.9307418825971
NEXT_PUBLIC_PRODUCTION_URL=https://slackconnectfrontendv1.netlify.app
NETLIFY=true
```

### Local Development (.env.local)
```bash
NEXT_PUBLIC_BACKEND_URL=https://slackconnectbackendv1.onrender.com/api
NEXT_PUBLIC_SLACK_CLIENT_ID=9312608562228.9307418825971
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3002
NEXT_PUBLIC_PRODUCTION_URL=https://slackconnectfrontendv1.netlify.app

# Ngrok Configuration
NGROK_AUTHTOKEN=your_token_here
NGROK_REGION=us
NEXT_PORT=3002
```

## 🔧 Backend Configuration

Ensure your backend (Render) accepts requests from:
- `https://slackconnectfrontendv1.netlify.app` (production)
- `https://*.ngrok.io` (development)
- `http://localhost:*` (local development)

### CORS Configuration
Your backend should allow these origins:
```javascript
const allowedOrigins = [
  'https://slackconnectfrontendv1.netlify.app',
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://localhost:3002',
  /https:\/\/.*\.ngrok\.io$/,
  /https:\/\/.*\.ngrok-free\.app$/
];
```

## 🧪 Testing Checklist

### Production Testing
- [ ] Visit https://slackconnectfrontendv1.netlify.app
- [ ] Test OAuth flow with production URLs
- [ ] Send test messages
- [ ] Schedule test messages
- [ ] Check message history

### Local Development Testing
- [ ] Start dev server with `npm run dev:tunnel`
- [ ] Update Slack app with ngrok URLs
- [ ] Test OAuth flow
- [ ] Test all app functionality

## 🚨 Troubleshooting

### Common Issues

#### "OAuth redirect mismatch"
- Check that your Slack app OAuth URLs match exactly
- Ensure no trailing slashes where not expected
- Verify the domain matches (ngrok vs localhost)

#### "CORS errors"
- Verify backend allows your frontend domain
- Check that all environment variables are set correctly

#### "Failed to connect"
- Verify backend is running and accessible
- Check network connectivity
- Verify API endpoints are correct

#### "Build failures on Netlify"
- Check that all environment variables are set
- Verify the build command and publish directory
- Check for any missing dependencies

### Debug Commands
```bash
# Check current configuration
npm run preview

# Test build locally
npm run build:netlify

# Check environment variables
node -e "console.log(process.env)"
```

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure OAuth URLs are correctly configured
4. Check backend logs for API errors

## 🔄 Continuous Deployment

The Netlify deployment is set up for automatic deployment from your main branch. Every push to main will trigger a new build and deployment.

### Manual Deployment
If you need to manually trigger a deployment:
1. Go to your Netlify dashboard
2. Navigate to your site
3. Click "Trigger deploy" → "Deploy site"
