# Ngrok Setup for HTTPS Local Development

This project includes ngrok integration to provide HTTPS URLs for your local development server. This is especially useful for:

- Testing webhooks
- OAuth redirects
- SSL-required integrations
- Sharing your local development server

## Quick Start

### Option 1: Start Dev Server with Ngrok (Recommended)
```bash
npm run dev:tunnel
```
This will start both your Next.js development server and create an ngrok tunnel.

### Option 2: Create Tunnel Only
If you already have your dev server running:
```bash
npm run tunnel
```

## Configuration

Copy `.env.example` to `.env.local` and customize the ngrok settings:

```bash
# Optional: Ngrok auth token for better features
NGROK_AUTHTOKEN=your_ngrok_auth_token_here

# Region (us, eu, ap, au, sa, jp, in)
NGROK_REGION=us

# Custom subdomain (requires paid ngrok plan)
NGROK_SUBDOMAIN=your-custom-subdomain

# Next.js port
NEXT_PORT=3000
```

## Getting Your Ngrok Auth Token (Recommended)

1. Sign up for a free account at [ngrok.com](https://ngrok.com/)
2. Go to [your dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)
3. Copy your authtoken
4. Add it to your `.env.local` file as `NGROK_AUTHTOKEN=your_token_here`

### Benefits of using an auth token:
- Longer session times
- Custom subdomains (with paid plans)
- Better rate limits
- Tunnel status and analytics

## Usage Examples

### For Slack OAuth Development
When developing Slack integrations, use the ngrok HTTPS URL for your OAuth redirect URLs:
```
https://your-ngrok-url.ngrok.io/auth/callback
```

### For Webhook Testing
Use the ngrok URL for webhook endpoints:
```
https://your-ngrok-url.ngrok.io/api/webhooks/slack
```

## Troubleshooting

### "Tunnel connection failed"
- Make sure your local server is running on the specified port
- Check your internet connection
- Verify ngrok is properly installed

### "Invalid authtoken"
- Make sure you've copied the correct authtoken from your ngrok dashboard
- Ensure there are no extra spaces in your `.env.local` file

### "Subdomain not available"
- Custom subdomains require a paid ngrok plan
- Remove the `NGROK_SUBDOMAIN` from your `.env.local` if you don't have a paid plan

## Commands Summary

| Command | Description |
|---------|-------------|
| `npm run dev:tunnel` | Start Next.js dev server + ngrok tunnel |
| `npm run tunnel` | Create ngrok tunnel only (server must be running) |
| `npm run dev` | Start Next.js dev server only (no tunnel) |

## Security Note

- Never commit your ngrok authtoken to version control
- The `.env.local` file is already gitignored
- Ngrok URLs are publicly accessible - be careful with sensitive data in development
