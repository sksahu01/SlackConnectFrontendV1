'use client';

import React, { useState } from 'react';
import { Webhook, TestTube, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import WebhookMessageForm from '@/components/WebhookMessageForm';
import TestWebhookForm from '@/components/TestWebhookForm';
import WebhookScheduledMessages from '@/components/WebhookScheduledMessages';

interface WebhookSectionProps {
    onMessageSent?: () => void;
}

const WebhookSection: React.FC<WebhookSectionProps> = ({ onMessageSent }) => {
    const [activeTab, setActiveTab] = useState<'send' | 'test' | 'scheduled'>('send');
    const [isExpanded, setIsExpanded] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleMessageSent = () => {
        setRefreshTrigger(prev => prev + 1);
        onMessageSent?.();
    };

    return (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 overflow-hidden">
            {/* Header */}
            <div
                className="p-4 cursor-pointer hover:bg-white hover:bg-opacity-50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg mr-3">
                            <Webhook className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Webhook Integration</h2>
                            <p className="text-sm text-gray-600">Send messages via webhooks without authentication</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                            No Auth Required
                        </span>
                        {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="border-t border-purple-200 bg-white">
                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('send')}
                            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'send'
                                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            <Webhook className="w-4 h-4 inline mr-2" />
                            Send Message
                        </button>
                        <button
                            onClick={() => setActiveTab('test')}
                            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'test'
                                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            <TestTube className="w-4 h-4 inline mr-2" />
                            Test Webhook
                        </button>
                        <button
                            onClick={() => setActiveTab('scheduled')}
                            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'scheduled'
                                    ? 'border-green-500 text-green-600 bg-green-50'
                                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Scheduled Messages
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'send' ? (
                            <WebhookMessageForm onMessageSent={handleMessageSent} />
                        ) : activeTab === 'test' ? (
                            <TestWebhookForm />
                        ) : (
                            <WebhookScheduledMessages refreshTrigger={refreshTrigger} />
                        )}
                    </div>

                    {/* API Endpoints Info */}
                    <div className="bg-gray-50 border-t border-gray-200 p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Available Webhook Endpoints</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                            <div className="bg-white p-3 rounded border">
                                <div className="font-medium text-purple-600 mb-1">Send Immediate</div>
                                <div className="text-gray-600 mb-1">POST /api/messages/webhook/send</div>
                                <div className="text-gray-500">{`{"message": "Your message"}`}</div>
                            </div>
                            <div className="bg-white p-3 rounded border">
                                <div className="font-medium text-purple-600 mb-1">Schedule Message</div>
                                <div className="text-gray-600 mb-1">POST /api/messages/webhook/schedule</div>
                                <div className="text-gray-500">{`{"message": "...", "scheduled_for": 1691520000}`}</div>
                            </div>
                            <div className="bg-white p-3 rounded border">
                                <div className="font-medium text-green-600 mb-1">Get Scheduled</div>
                                <div className="text-gray-600 mb-1">GET /api/messages/webhook/scheduled</div>
                                <div className="text-gray-500">No body required</div>
                            </div>
                            <div className="bg-white p-3 rounded border">
                                <div className="font-medium text-blue-600 mb-1">Test Webhook</div>
                                <div className="text-gray-600 mb-1">POST /api/test/webhook</div>
                                <div className="text-gray-500">{`{"webhook_url": "...", "message": "..."}`}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-4">
                            <div className="bg-white p-3 rounded border">
                                <div className="font-medium text-orange-600 mb-1">Cancel Scheduled</div>
                                <div className="text-gray-600 mb-1">DELETE /api/messages/webhook/scheduled/:id</div>
                                <div className="text-gray-500">No body required</div>
                            </div>
                            <div className="bg-white p-3 rounded border">
                                <div className="font-medium text-orange-600 mb-1">Update Scheduled</div>
                                <div className="text-gray-600 mb-1">PUT /api/messages/webhook/scheduled/:id</div>
                                <div className="text-gray-500">{`{"message": "...", "scheduled_for": 1691520000}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebhookSection;
