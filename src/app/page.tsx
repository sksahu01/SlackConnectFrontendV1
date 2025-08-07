'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/ui/Loading';
import ConnectSlack from '@/components/ConnectSlack';
import Layout from '@/components/Layout';
import MessageForm from '@/components/MessageForm';
import ScheduledMessages from '@/components/ScheduledMessages';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading message="Loading..." fullScreen />;
  }

  // Show connect screen if not authenticated
  if (!isAuthenticated) {
    return <ConnectSlack />;
  }

  const handleMessageSent = () => {
    // Trigger refresh of scheduled messages list
    setRefreshTrigger(prev => prev + 1);
  };

  // Show main dashboard if authenticated
  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Message */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Slack Connect
          </h1>
          <p className="text-lg text-gray-600">
            Send messages instantly or schedule them for later delivery
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Message Form */}
          <div>
            <MessageForm onMessageSent={handleMessageSent} />
          </div>

          {/* Scheduled Messages */}
          <div>
            <ScheduledMessages refreshTrigger={refreshTrigger} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                1
              </div>
              <p>Choose a channel and compose your message</p>
            </div>
            <div>
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                2
              </div>
              <p>Send immediately or schedule for later</p>
            </div>
            <div>
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                3
              </div>
              <p>Manage your scheduled messages anytime</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
