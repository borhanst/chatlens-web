import React, { useState } from 'react';
import { 
  Key, 
  BarChart3, 
  Code, 
  Webhook, 
  FileText,
  Plus,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Edit,
  Play,
  ChevronDown,
  ChevronRight,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  X,
  Save,
  Download,
  Search,
  Filter,
  ExternalLink,
  Shield,
  Clock,
  Activity,
  Zap
} from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'error';
  lastTriggered: string;
  secret: string;
}

interface EventLog {
  id: string;
  webhook: string;
  event: string;
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  responseCode: number;
  endpoint: string;
}

const ApiWebhookSettings = () => {
  const [activeSection, setActiveSection] = useState<string>('api-keys');
  const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);
  const [showCreateWebhookModal, setShowCreateWebhookModal] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [usagePeriod, setUsagePeriod] = useState('week');
  const [testEndpoint, setTestEndpoint] = useState('/chat');
  const [testBody, setTestBody] = useState('{\n  "message": "Hello, ChatLens!",\n  "user_id": "user123"\n}');
  const [testResponse, setTestResponse] = useState<any>(null);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [apiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'cl_live_1234567890abcdef1234567890abcdef',
      createdAt: '2024-01-15',
      lastUsed: '2024-12-15 14:30:00',
      status: 'active'
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'cl_test_abcdef1234567890abcdef1234567890',
      createdAt: '2024-02-01',
      lastUsed: '2024-12-14 09:15:00',
      status: 'active'
    },
    {
      id: '3',
      name: 'Legacy Integration',
      key: 'cl_live_fedcba0987654321fedcba0987654321',
      createdAt: '2023-11-20',
      lastUsed: '2024-11-30 16:45:00',
      status: 'revoked'
    }
  ]);

  const [webhooks] = useState<WebhookConfig[]>([
    {
      id: '1',
      name: 'Slack Notifications',
      url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
      events: ['message_received', 'conversation_ended'],
      status: 'active',
      lastTriggered: '2024-12-15 14:25:00',
      secret: 'whsec_1234567890abcdef'
    },
    {
      id: '2',
      name: 'CRM Integration',
      url: 'https://api.yourcrm.com/webhooks/chatlens',
      events: ['lead_captured', 'conversation_ended'],
      status: 'active',
      lastTriggered: '2024-12-15 13:45:00',
      secret: 'whsec_abcdef1234567890'
    },
    {
      id: '3',
      name: 'Analytics Tracker',
      url: 'https://analytics.example.com/webhook',
      events: ['message_received'],
      status: 'error',
      lastTriggered: '2024-12-14 10:30:00',
      secret: 'whsec_fedcba0987654321'
    }
  ]);

  const [eventLogs] = useState<EventLog[]>([
    {
      id: '1',
      webhook: 'Slack Notifications',
      event: 'message_received',
      timestamp: '2024-12-15 14:25:00',
      status: 'success',
      responseCode: 200,
      endpoint: 'https://hooks.slack.com/services/...'
    },
    {
      id: '2',
      webhook: 'CRM Integration',
      event: 'lead_captured',
      timestamp: '2024-12-15 13:45:00',
      status: 'success',
      responseCode: 201,
      endpoint: 'https://api.yourcrm.com/webhooks/chatlens'
    },
    {
      id: '3',
      webhook: 'Analytics Tracker',
      event: 'message_received',
      timestamp: '2024-12-14 10:30:00',
      status: 'failed',
      responseCode: 500,
      endpoint: 'https://analytics.example.com/webhook'
    }
  ]);

  const usageData = {
    today: { requests: 1247, latency: 120, errors: 0.5, trend: 'up' },
    week: { requests: 8934, latency: 115, errors: 1.2, trend: 'up' },
    month: { requests: 34567, latency: 125, errors: 2.1, trend: 'down' }
  };

  const sections = [
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'usage', label: 'API Usage', icon: BarChart3 },
    { id: 'test', label: 'Test API', icon: Code },
    { id: 'webhooks', label: 'Webhook Settings', icon: Webhook },
    { id: 'logs', label: 'Event Log', icon: FileText }
  ];

  const endpoints = [
    { value: '/chat', label: 'POST /chat - Send message' },
    { value: '/conversations', label: 'GET /conversations - List conversations' },
    { value: '/analytics', label: 'GET /analytics - Get analytics data' },
    { value: '/settings', label: 'GET /settings - Get bot settings' }
  ];

  const webhookEvents = [
    { id: 'message_received', label: 'Message Received', description: 'Triggered when a user sends a message' },
    { id: 'conversation_started', label: 'Conversation Started', description: 'Triggered when a new conversation begins' },
    { id: 'conversation_ended', label: 'Conversation Ended', description: 'Triggered when a conversation is closed' },
    { id: 'lead_captured', label: 'Lead Captured', description: 'Triggered when user information is collected' },
    { id: 'error_occurred', label: 'Error Occurred', description: 'Triggered when an error happens' }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, show a toast notification
  };

  const handleTestApi = async () => {
    setIsTestLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTestResponse({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': '999',
          'X-Response-Time': '120ms'
        },
        body: {
          success: true,
          response: "Hello! I'm ChatLens AI assistant. How can I help you today?",
          conversation_id: "conv_1234567890",
          timestamp: new Date().toISOString()
        }
      });
      setIsTestLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'inactive':
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
      case 'failed':
      case 'revoked':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'error':
      case 'failed':
      case 'revoked':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const filteredEventLogs = eventLogs.filter(log => {
    const matchesSearch = log.webhook.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'api-keys':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
                <p className="text-sm text-gray-600">Manage your ChatLens API keys for secure integration</p>
              </div>
              <button
                onClick={() => setShowCreateKeyModal(true)}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Key
              </button>
            </div>

            {/* Security Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Security Best Practices</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Keep your API keys secure. Never expose them in client-side code or public repositories.
                  </p>
                </div>
              </div>
            </div>

            {/* API Keys Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Key</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Used</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((key) => (
                      <tr key={key.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{key.name}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                              {visibleKeys.has(key.id) ? key.key : '••••••••••••••••••••••••••••••••'}
                            </code>
                            <button
                              onClick={() => toggleKeyVisibility(key.id)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {visibleKeys.has(key.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => copyToClipboard(key.key)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(key.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(key.lastUsed).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(key.status)}`}>
                            {getStatusIcon(key.status)}
                            <span className="ml-1 capitalize">{key.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">API Usage</h3>
                <p className="text-sm text-gray-600">Monitor your API usage and performance metrics</p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={usagePeriod}
                  onChange={(e) => setUsagePeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-center text-sm">
                    {usageData[usagePeriod as keyof typeof usageData].trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={usageData[usagePeriod as keyof typeof usageData].trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {usageData[usagePeriod as keyof typeof usageData].trend === 'up' ? '+12%' : '-5%'}
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Total Requests</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {usageData[usagePeriod as keyof typeof usageData].requests.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">-8ms</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Avg. Latency</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {usageData[usagePeriod as keyof typeof usageData].latency}ms
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">-0.3%</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Error Rate</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {usageData[usagePeriod as keyof typeof usageData].errors}%
                </p>
              </div>
            </div>

            {/* Usage Chart */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Request Volume</h4>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[120, 150, 180, 220, 190, 240, 280, 200, 160, 300, 250, 320].map((height, index) => (
                  <div key={index} className="flex-1 bg-blue-100 rounded-t-lg relative group cursor-pointer hover:bg-blue-200 transition-colors">
                    <div 
                      className="bg-blue-500 rounded-t-lg transition-all duration-300"
                      style={{ height: `${(height / 320) * 100}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height} requests
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                {['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'].map(time => (
                  <span key={time}>{time}</span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'test':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Test API</h3>
              <p className="text-sm text-gray-600">Test your ChatLens API endpoints directly from the dashboard</p>
            </div>

            {/* Test Console */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">API Test Console</h4>
              
              <div className="space-y-4">
                {/* Endpoint Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Endpoint</label>
                  <select
                    value={testEndpoint}
                    onChange={(e) => setTestEndpoint(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {endpoints.map((endpoint) => (
                      <option key={endpoint.value} value={endpoint.value}>
                        {endpoint.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Request Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Request Body (JSON)</label>
                  <textarea
                    value={testBody}
                    onChange={(e) => setTestBody(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Enter JSON request body..."
                  />
                </div>

                {/* Send Button */}
                <button
                  onClick={handleTestApi}
                  disabled={isTestLoading}
                  className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isTestLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isTestLoading ? 'Sending...' : 'Send Request'}
                </button>
              </div>

              {/* Response */}
              {testResponse && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h5 className="text-sm font-semibold text-gray-900 mb-3">Response</h5>
                  
                  {/* Status */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      testResponse.status === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {testResponse.status} {testResponse.status === 200 ? 'OK' : 'Error'}
                    </span>
                  </div>

                  {/* Headers */}
                  <div className="mb-4">
                    <h6 className="text-xs font-semibold text-gray-700 mb-2">Headers</h6>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <pre className="text-xs text-gray-600 font-mono">
                        {JSON.stringify(testResponse.headers, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Body */}
                  <div>
                    <h6 className="text-xs font-semibold text-gray-700 mb-2">Response Body</h6>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <pre className="text-xs text-gray-600 font-mono">
                        {JSON.stringify(testResponse.body, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'webhooks':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Webhook Settings</h3>
                <p className="text-sm text-gray-600">Configure webhooks to receive real-time notifications</p>
              </div>
              <button
                onClick={() => setShowCreateWebhookModal(true)}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Webhook
              </button>
            </div>

            {/* Webhooks List */}
            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-md font-semibold text-gray-900">{webhook.name}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(webhook.status)}`}>
                          {getStatusIcon(webhook.status)}
                          <span className="ml-1 capitalize">{webhook.status}</span>
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">{webhook.url}</code>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Events:</span> {webhook.events.join(', ')}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Last triggered: {new Date(webhook.lastTriggered).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Events */}
                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map((event) => (
                      <span key={event} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {event.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'logs':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Event Log</h3>
                <p className="text-sm text-gray-600">Monitor webhook delivery status and responses</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Event Log Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Webhook</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Event</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Response</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEventLogs.map((log) => (
                      <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{log.webhook}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{log.endpoint}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            {log.event.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                            {getStatusIcon(log.status)}
                            <span className="ml-1 capitalize">{log.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-mono ${
                            log.responseCode >= 200 && log.responseCode < 300 ? 'bg-green-100 text-green-800' :
                            log.responseCode >= 400 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {log.responseCode}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredEventLogs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No events found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">API & Webhook Settings</h1>
        <p className="text-gray-600">
          Manage your API keys, monitor usage, and configure webhooks for real-time notifications.
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <div key={section.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => setActiveSection(isActive ? '' : section.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.label}</h3>
                  </div>
                </div>
                {isActive ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Section Content */}
              {isActive && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-6">
                    {renderSection(section.id)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create API Key Modal */}
      {showCreateKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New API Key</h3>
              <button
                onClick={() => setShowCreateKeyModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Production API Key"
                  />
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">Important</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Make sure to copy your API key now. You won't be able to see it again!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateKeyModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Create key logic here
                    setShowCreateKeyModal(false);
                    setNewKeyName('');
                  }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Create Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Action Bar */}
      <div className="fixed bottom-6 right-6 flex items-center space-x-3">
        <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium shadow-lg transition-colors">
          <Copy className="w-4 h-4 mr-2" />
          Copy API Key
        </button>
        <button className="flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-lg transition-colors">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ApiWebhookSettings;