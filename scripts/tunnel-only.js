const ngrok = require('ngrok');
require('dotenv').config({ path: '.env.local' });

async function createTunnel() {
    const port = process.env.NEXT_PORT || 3000;
    const region = process.env.NGROK_REGION || 'us';
    const authtoken = process.env.NGROK_AUTHTOKEN;
    const subdomain = process.env.NGROK_SUBDOMAIN;

    try {
        console.log(`🌐 Creating ngrok tunnel for localhost:${port}...`);

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
        console.log('\n📋 Make sure your local server is running on the specified port');
        console.log('💡 Press Ctrl+C to stop the tunnel\n');

        // Copy URL to clipboard (if possible)
        try {
            const { spawn } = require('child_process');
            spawn('powershell', ['-command', `"${url}" | Set-Clipboard`], { stdio: 'ignore' });
            console.log('📄 HTTPS URL copied to clipboard!\n');
        } catch (error) {
            // Clipboard copy failed, but that's ok
        }

        // Handle process termination
        process.on('SIGINT', async () => {
            console.log('\n🛑 Shutting down ngrok tunnel...');
            await ngrok.disconnect();
            await ngrok.kill();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            console.log('\n🛑 Shutting down ngrok tunnel...');
            await ngrok.disconnect();
            await ngrok.kill();
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Error creating ngrok tunnel:', error);
        console.error('💡 Tip: Make sure you have ngrok installed and configured properly');
        if (error.message.includes('authtoken')) {
            console.error('🔑 You may need to add your ngrok authtoken to .env.local');
            console.error('   Get your token from: https://dashboard.ngrok.com/get-started/your-authtoken');
        }
        process.exit(1);
    }
}

createTunnel();
