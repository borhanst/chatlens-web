import React, { useState } from 'react';
import { 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Users, 
  Star,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const ChatAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('conversations');

  const analyticsData = {
    conversations: {
      total: 12847,
      change: '+12.5%',
      trend: 'up',
      data: [120, 150, 180, 220, 190, 240, 280]
    },
    responseTime: {
      average: '1.2s',
      change: '-0.3s',
      trend: 'up',
      data: [1.5, 1.4, 1.3, 1.2, 1.1, 1.2, 1.0]
    },
    satisfaction: {
      score: 4.8,
      change: '+0.2',
      trend: 'up',
      data: [4.6, 4.7, 4.8, 4.7, 4.9, 4.8, 4.8]
    },
    resolution: {
      rate: '89%',
      change: '+5%',
      trend: 'up',
      data: [84, 86, 87, 89, 88, 90, 89]
    }
  };

  const topIntents = [
    { intent: 'Pricing Inquiry', count: 2341, percentage: 18.2 },
    { intent: 'Technical Support', count: 1987, percentage: 15.5 },
    { intent: 'Account Help', count: 1654, percentage: 12.9 },
    { intent: 'Product Information', count: 1432, percentage: 11.1 },
    { intent: 'Billing Questions', count: 1098, percentage: 8.5 }
  ];

  const conversationFlow = [
    { step: 'Greeting', users: 12847, dropoff: 0 },
    { step: 'Intent Recognition', users: 12234, dropoff: 4.8 },
    { step: 'Information Provided', users: 11567, dropoff: 5.5 },
    { step: 'Follow-up Questions', users: 9876, dropoff: 14.6 },
    { step: 'Resolution', users: 8765, dropoff: 11.2 }
  ];

  const userSentiment = [
    { sentiment: 'Positive', count: 7854, percentage: 61.1, color: 'bg-green-500' },
    { sentiment: 'Neutral', count: 3456, percentage: 26.9, color: 'bg-gray-500' },
    { sentiment: 'Negative', count: 1537, percentage: 12.0, color: 'bg-red-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-satoshi font-bold text-gray-900">Chat Analytics</h1>
          <p className="text-gray-600 font-inter">Detailed insights into your chatbot performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg font-inter text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-inter text-sm transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          
          <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-inter text-sm transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12.5%</span>
          </div>
          <h3 className="text-sm font-inter font-medium text-gray-600 mb-2">Total Conversations</h3>
          <p className="text-2xl font-satoshi font-bold text-gray-900">12,847</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">-0.3s</span>
          </div>
          <h3 className="text-sm font-inter font-medium text-gray-600 mb-2">Avg Response Time</h3>
          <p className="text-2xl font-satoshi font-bold text-gray-900">1.2s</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+0.2</span>
          </div>
          <h3 className="text-sm font-inter font-medium text-gray-600 mb-2">Satisfaction Score</h3>
          <p className="text-2xl font-satoshi font-bold text-gray-900">4.8/5</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+5%</span>
          </div>
          <h3 className="text-sm font-inter font-medium text-gray-600 mb-2">Resolution Rate</h3>
          <p className="text-2xl font-satoshi font-bold text-gray-900">89%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversation Trends */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-satoshi font-semibold text-gray-900">Conversation Trends</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.conversations.data.map((value, index) => (
              <div key={index} className="flex-1 bg-blue-100 rounded-t-lg relative group cursor-pointer hover:bg-blue-200 transition-colors">
                <div 
                  className="bg-blue-500 rounded-t-lg transition-all duration-300"
                  style={{ height: `${(value / Math.max(...analyticsData.conversations.data)) * 100}%` }}
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {value} chats
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>

        {/* Top Intents */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-satoshi font-semibold text-gray-900">Top Intents</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {topIntents.map((intent, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-inter font-medium text-gray-900">{intent.intent}</span>
                    <span className="text-sm text-gray-500">{intent.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${intent.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversation Flow */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-satoshi font-semibold text-gray-900">Conversation Flow</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {conversationFlow.map((step, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{step.step}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{step.users.toLocaleString()}</div>
                  {step.dropoff > 0 && (
                    <div className="text-xs text-red-600">-{step.dropoff}%</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Sentiment */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-satoshi font-semibold text-gray-900">User Sentiment</h3>
            <Star className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {userSentiment.map((sentiment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${sentiment.color} mr-3`} />
                  <span className="text-sm font-medium text-gray-900">{sentiment.sentiment}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{sentiment.count.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{sentiment.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Overall Sentiment</span>
              <span className="font-medium text-green-600">Positive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAnalytics;