import React, { useState } from 'react';
import { 
  BarChart3, 
  Settings, 
  MessageSquare, 
  Globe, 
  Palette, 
  Database, 
  Webhook, 
  Users, 
  CreditCard, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Bot,
  
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      id: 'agent-settings',
      label: 'Agent Settings',
      icon: Bot,
      path: '/dashboard/agent-settings',
      active: location.pathname === '/dashboard/agent-settings'
    },
    {
      id: 'chat-analytics',
      label: 'Chat Analytics',
      icon: MessageSquare,
      path: '/dashboard/analytics',
      active: location.pathname === '/dashboard/analytics'
    },
    {
      id: 'crawler-settings',
      label: 'Crawler Settings',
      icon: Globe,
      path: '/dashboard/crawler',
      active: location.pathname === '/dashboard/crawler'
    },
    {
      id: 'widget-appearance',
      label: 'Widget Appearance',
      icon: Palette,
      path: '/dashboard/appearance',
      active: location.pathname === '/dashboard/appearance'
    },
    {
      id: 'vector-storage',
      label: 'Vector Storage',
      icon: Database,
      path: '/dashboard/vector',
      active: location.pathname === '/dashboard/vector'
    },
    {
      id: 'api-webhooks',
      label: 'API & Webhooks',
      icon: Webhook,
      path: '/dashboard/api',
      active: location.pathname === '/dashboard/api'
    },
    {
      id: 'team-access',
      label: 'Team Access',
      icon: Users,
      path: '/dashboard/team',
      active: location.pathname === '/dashboard/team'
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: CreditCard,
      path: '/dashboard/billing',
      active: location.pathname === '/dashboard/billing'
    },
    {
      id: 'profile',
      label: 'Profile Settings',
      icon: Settings,
      path: '/dashboard/profile',
      active: location.pathname === '/dashboard/profile'
    }
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-satoshi font-bold text-gray-900">ChatLens</span>
            </Link>
          )}
          
          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
          )}
          
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center px-3 py-2.5 rounded-xl font-inter font-medium transition-all duration-200 group ${
                item.active
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                item.active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
              }`} />
              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-16 bg-gray-900 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-3 py-2.5 rounded-xl font-inter font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} group-hover:text-red-600`} />
          {!isCollapsed && <span>Logout</span>}
          
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-16 bg-gray-900 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;