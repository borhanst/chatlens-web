import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Clock, 
  Star, 
  TrendingUp, 
  Users, 
  Activity,
  AlertCircle,
  Download,
  RefreshCw,
  Calendar,
  ChevronDown,
  Eye,
  Bot,
  Zap
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon: Icon, color }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Eye className="w-4 h-4" />
        </button>
      </div>
      
      <h3 className="text-sm font-inter font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-satoshi font-bold text-gray-900">{value}</span>
        <div className={`flex items-center text-sm font-medium ${getTrendColor()}`}>
          <span className="mr-1">{getTrendIcon()}</span>
          {change}
        </div>
      </div>
    </div>
  );
};

interface LiveConversation {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'waiting';
}

const Dashboard = () => {
  const [selectedBot, setSelectedBot] = useState('Main Website Bot');
  const [dateRange, setDateRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveConversations] = useState<LiveConversation[]>([
    {
      id: '1',
      user: 'John D.',
      message: 'How do I reset my password?',
      timestamp: '2 min ago',
      status: 'active'
    },
    {
      id: '2',
      user: 'Sarah M.',
      message: 'What are your pricing plans?',
      timestamp: '5 min ago',
      status: 'resolved'
    },
    {
      id: '3',
      user: 'Mike R.',
      message: 'Can I integrate with Shopify?',
      timestamp: '8 min ago',
      status: 'waiting'
    }
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const metrics = [
    {
      title: 'Total Conversations',
      value: '12,847',
      change: '+12.5%',
      trend: 'up' as const,
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    {
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-0.3s',
      trend: 'up' as const,
      icon: Clock,
      color: 'bg-green-500'
    },
    {
      title: 'Satisfaction Score',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up' as const,
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: 'API Usage',
      value: '89%',
      change: '+5%',
      trend: 'neutral' as const,
      icon: Activity,
      color: 'bg-purple-500'
    }
  ];

  const topQueries = [
    { query: 'How to reset password', count: 234, percentage: 18 },
    { query: 'Pricing information', count: 189, percentage: 15 },
    { query: 'Integration help', count: 156, percentage: 12 },
    { query: 'Account setup', count: 134, percentage: 11 },
    { query: 'Billing questions', count: 98, percentage: 8 }
  ];

  const modelUsage = [
    { model: 'GPT-4', usage: 65, color: 'bg-blue-500' },
    { model: 'GPT-3.5', usage: 25, color: 'bg-green-500' },
    { model: 'Claude', usage: 10, color: 'bg-purple-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-satoshi font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 font-inter">Monitor your ChatLens performance and analytics</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Bot Selector */}
          <div className="relative">
            <select 
              value={selectedBot}
              onChange={(e) => setSelectedBot(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Main Website Bot</option>
              <option>Support Bot</option>
              <option>Sales Bot</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Date Range */}
          <div className="relative">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-inter text-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          {/* Export Button */}
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-inter text-sm transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversation Timeline */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-satoshi font-semibold text-gray-900">Conversation Timeline</h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
          
          {/* Mock Chart */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 65, 80].map((height, index) => (
              <div key={index} className="flex-1 bg-blue-100 rounded-t-lg relative group cursor-pointer hover:bg-blue-200 transition-colors">
                <div 
                  className="bg-blue-500 rounded-t-lg transition-all duration-300"
                  style={{ height: `${height}%` }}
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {Math.floor(height * 2.5)} chats
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-4">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Top Queries */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-satoshi font-semibold text-gray-900">Top Queries</h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {topQueries.map((query, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-inter font-medium text-gray-900">{query.query}</span>
                    <span className="text-sm text-gray-500">{query.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${query.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Usage */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-satoshi font-semibold text-gray-900">Model Usage</h3>
            <Bot className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {modelUsage.map((model, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${model.color} mr-3`} />
                  <span className="text-sm font-inter font-medium text-gray-900">{model.model}</span>
                </div>
                <span className="text-sm text-gray-500">{model.usage}%</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total API Calls</span>
              <span className="font-medium text-gray-900">45,231</span>
            </div>
          </div>
        </div>

        {/* Live Conversations */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-satoshi font-semibold text-gray-900">Live Conversations</h3>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              <span className="text-sm text-gray-500">3 active</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {liveConversations.map((conversation) => (
              <div key={conversation.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{conversation.user}</span>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.message}</p>
                  <div className="flex items-center mt-1">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      conversation.status === 'active' ? 'bg-green-500' :
                      conversation.status === 'resolved' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-xs text-gray-500 capitalize">{conversation.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-satoshi font-semibold text-gray-900">System Status</h3>
            <Zap className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <span className="text-sm font-medium text-gray-900">API Status</span>
              </div>
              <span className="text-sm text-green-600">Operational</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <span className="text-sm font-medium text-gray-900">Chat Widget</span>
              </div>
              <span className="text-sm text-green-600">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                <span className="text-sm font-medium text-gray-900">Vector DB</span>
              </div>
              <span className="text-sm text-yellow-600">Syncing</span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View Status Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;