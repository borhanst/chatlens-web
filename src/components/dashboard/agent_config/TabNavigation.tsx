import React from 'react';
import { TabConfig } from './types';

interface TabNavigationProps {
  tabs: TabConfig[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ 
  tabs, 
  activeTab, 
  setActiveTab 
}) => (
  <div className="mb-8">
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className={`w-5 h-5 mr-2 ${
                activeTab === tab.id ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
              }`} />
              <div className="text-left">
                <div className="font-inter font-medium">{tab.label}</div>
                <div className="text-xs text-gray-400 hidden sm:block">{tab.description}</div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  </div>
);