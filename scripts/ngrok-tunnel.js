const ngrok = require('ngrok');
const { spawn } = require('child_process');
require('dotenv').config({ path: '.env.local' });

async function startDevWithNgrok() {
    const port = process.env.NEXT_PORT || 3000;
    const region = process.env.NGROK_REGION || 'us';
    const authtoken = process.env.NGROK_AUTHTOKEN;
    const subdomain = process.env.NGROK_SUBDOMAIN;

    console.log('🚀 Starting Next.js development server...');

    // Start Next.js dev server
    const nextProcess = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        shell: true,
        env: { ...process.env, PORT: port }
    });

    // Wait a bit for the dev server to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        console.log('🌐 Creating ngrok tunnel...');

        // Configure ngrok options
        const ngrokOptions = {
            port: parseInt(port),
            region: region
        };

        // Add auth token if provided
        if (authtoken) {
            ngrokOptions.authtoken = authtoken;
        }

        // Add subdomain if provided (requires paid plan)
        if (subdomain) {
            ngrokOptions.subdomain = subdomain;
        }

        // Connect ngrok
        const url = await ngrok.connect(ngrokOptions);

        console.log('\n✅ Ngrok tunnel established!');
        console.log(`🔗 Public HTTPS URL: ${url}`);
        console.log(`🏠 Local URL: http://localhost:${port}`);
        console.log(`🌍 Region: ${region}`);
        if (subdomain) {
            console.log(`🏷️  Custom subdomain: ${subdomain}`);
        }
        console.log('\n📋 OAuth Redirect URLs for Slack App Configuration:');
        console.log(`   Success: ${url}/auth/success`);
        console.log(`   Error: ${url}/auth/error`);
        console.log('\n🔧 Make sure to update your Slack app configuration with these URLs!');
        console.log('💡 Press Ctrl+C to stop both the dev server and ngrok tunnel\n');        // Copy URL to clipboard (if possible)
        try {
            const { spawn: spawnSync } = require('child_process');
            spawnSync('powershell', ['-command', `"${url}" | Set-Clipboard`], { stdio: 'ignore' });
            console.log('📄 HTTPS URL copied to clipboard!\n');
        } catch (error) {
            // Clipboard copy failed, but that's ok
        }

        // Handle process termination
        process.on('SIGINT', async () => {
            console.log('\n🛑 Shutting down...');
            await ngrok.disconnect();
            await ngrok.kill();
            nextProcess.kill();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            console.log('\n🛑 Shutting down...');
            await ngrok.disconnect();
            await ngrok.kill();
            nextProcess.kill();
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Error creating ngrok tunnel:', error);
        console.error('💡 Tip: Make sure you have ngrok installed and configured properly');
        if (error.message.includes('authtoken')) {
            console.error('🔑 You may need to add your ngrok authtoken to .env.local');
            console.error('   Get your token from: https://dashboard.ngrok.com/get-started/your-authtoken');
        }
        nextProcess.kill();
        process.exit(1);
    }
}

startDevWithNgrok();
