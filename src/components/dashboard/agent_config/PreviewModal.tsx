import React from 'react';
import { X, Bot } from 'lucide-react';
import { ConfigData } from './types';

interface PreviewModalProps {
  config: ConfigData;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ 
  config, 
  showPreview, 
  setShowPreview 
}) => {
  if (!showPreview) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-poppins font-semibold text-gray-900">Agent Preview</h3>
          <button
            onClick={() => setShowPreview(false)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-electric-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-inter font-medium text-gray-900">{config.general.agentName}</div>
                <div className="text-xs text-green-500">Online</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700">{config.chatFlow.welcomeMessage}</p>
            </div>
            
            {config.chatFlow.followUpPrompts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {config.chatFlow.followUpPrompts.slice(0, 3).map((prompt, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-inter hover:bg-primary-200 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="text-center text-sm text-gray-500 font-inter">
            This is how your agent will appear to visitors
          </div>
        </div>
      </div>
    </div>
  );
};