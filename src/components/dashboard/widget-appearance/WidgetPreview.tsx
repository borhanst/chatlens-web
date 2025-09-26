import React from 'react';
import { MessageSquare, Bot, User, Monitor, Smartphone } from 'lucide-react';
import { WidgetConfig } from './types';

interface WidgetPreviewProps {
  config: WidgetConfig;
  previewMode: 'desktop' | 'mobile';
  setPreviewMode: (mode: 'desktop' | 'mobile') => void;
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({ 
  config, 
  previewMode, 
  setPreviewMode 
}) => {
  const getBackgroundStyle = () => {
    if (config.chatWindow.backgroundType === 'gradient') {
      return {
        background: `linear-gradient(135deg, ${config.chatWindow.gradientStart}, ${config.chatWindow.gradientEnd})`
      };
    }
    if (config.chatWindow.backgroundType === 'transparent') {
      return { backgroundColor: 'rgba(255, 255, 255, 0.95)' };
    }
    return { backgroundColor: config.chatWindow.backgroundColor };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Live Preview</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPreviewMode('desktop')}
            className={`p-2 rounded-lg transition-colors ${
              previewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`p-2 rounded-lg transition-colors ${
              previewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className={`${previewMode === 'mobile' ? 'max-w-sm' : 'max-w-md'} mx-auto`}>
        {/* Widget Launcher */}
        <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
          
          {/* Launcher Button */}
          <div 
            className={`absolute ${
              config.launcher.position === 'bottom-right' ? 'bottom-4 right-4' :
              config.launcher.position === 'bottom-left' ? 'bottom-4 left-4' :
              'bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2'
            }`}
          >
            <button
              className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              style={{
                backgroundColor: config.launcher.backgroundColor,
                width: `${config.launcher.size}px`,
                height: `${config.launcher.size}px`
              }}
            >
              {config.launcher.icon !== 'disabled' && (
                <MessageSquare className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Chat Window */}
        <div 
          className="rounded-xl shadow-xl border border-gray-200 overflow-hidden"
          style={{
            ...getBackgroundStyle(),
            borderRadius: `${config.chatWindow.cornerRadius}px`,
            fontFamily: config.typography.fontFamily,
            fontSize: `${config.typography.fontSize}px`,
            lineHeight: config.typography.lineHeight === 'tight' ? '1.25' : 
                       config.typography.lineHeight === 'roomy' ? '1.75' : '1.5'
          }}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              {config.header.showAvatar && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div>
                <div className="font-medium text-gray-900">ChatLens Assistant</div>
                <div className="text-xs text-green-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Online
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 h-64 overflow-y-auto">
            {/* Bot Message */}
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div 
                className="max-w-xs p-3 rounded-lg"
                style={{
                  backgroundColor: config.chatWindow.botBubbleColor,
                  color: config.chatWindow.botTextColor
                }}
              >
                <p className="text-sm">Hi! How can I help you today?</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start space-x-2 justify-end">
              <div 
                className="max-w-xs p-3 rounded-lg"
                style={{
                  backgroundColor: config.chatWindow.userBubbleColor,
                  color: config.chatWindow.userTextColor
                }}
              >
                <p className="text-sm">What are your pricing plans?</p>
              </div>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3 text-gray-600" />
              </div>
            </div>

            {/* Bot Response */}
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div 
                className="max-w-xs p-3 rounded-lg"
                style={{
                  backgroundColor: config.chatWindow.botBubbleColor,
                  color: config.chatWindow.botTextColor
                }}
              >
                <p className="text-sm">We offer three plans: Free, Business ($29/mo), and Enterprise. Would you like details on any specific plan?</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                style={{
                  backgroundColor: config.inputArea.backgroundColor,
                  borderRadius: `${config.inputArea.cornerRadius}px`
                }}
              >
                <span 
                  className="text-sm"
                  style={{ color: config.inputArea.placeholderColor }}
                >
                  Type your message...
                </span>
              </div>
              <button 
                className="p-2 rounded-lg text-white"
                style={{ backgroundColor: config.inputArea.sendButtonColor }}
              >
                {config.inputArea.sendButtonIcon === 'arrow' && '→'}
                {config.inputArea.sendButtonIcon === 'paper-plane' && '✈'}
                {config.inputArea.sendButtonIcon === 'send' && '📤'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Preview updates in real-time as you make changes
        </p>
      </div>
    </div>
  );
};

export default WidgetPreview;