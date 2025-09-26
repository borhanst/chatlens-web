import React from 'react';
import { WidgetConfig, ConfigUpdateFunction } from './types';

interface ChatWindowSectionProps {
  config: WidgetConfig;
  setConfig: ConfigUpdateFunction;
  checkContrast: (bg: string, text: string) => 'good' | 'warning' | 'poor';
}

const ChatWindowSection: React.FC<ChatWindowSectionProps> = ({ 
  config, 
  setConfig, 
  checkContrast 
}) => {
  return (
    <div className="space-y-6">
      {/* Message Bubble Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            User Message Bubble
          </label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.chatWindow.userBubbleColor}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  chatWindow: { ...prev.chatWindow, userBubbleColor: e.target.value }
                }))}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={config.chatWindow.userBubbleColor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    chatWindow: { ...prev.chatWindow, userBubbleColor: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Text Color */}
            <div>
              <label className="block text-xs text-gray-500 mb-2">Text Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={config.chatWindow.userTextColor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    chatWindow: { ...prev.chatWindow, userTextColor: e.target.value }
                  }))}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.chatWindow.userTextColor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    chatWindow: { ...prev.chatWindow, userTextColor: e.target.value }
                  }))}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className={`w-4 h-4 rounded-full ${
                  checkContrast(config.chatWindow.userBubbleColor, config.chatWindow.userTextColor) === 'good' ? 'bg-green-500' :
                  checkContrast(config.chatWindow.userBubbleColor, config.chatWindow.userTextColor) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} title="Contrast ratio" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Bot Message Bubble
          </label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.chatWindow.botBubbleColor}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  chatWindow: { ...prev.chatWindow, botBubbleColor: e.target.value }
                }))}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={config.chatWindow.botBubbleColor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    chatWindow: { ...prev.chatWindow, botBubbleColor: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Text Color */}
            <div>
              <label className="block text-xs text-gray-500 mb-2">Text Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={config.chatWindow.botTextColor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    chatWindow: { ...prev.chatWindow, botTextColor: e.target.value }
                  }))}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.chatWindow.botTextColor}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    chatWindow: { ...prev.chatWindow, botTextColor: e.target.value }
                  }))}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className={`w-4 h-4 rounded-full ${
                  checkContrast(config.chatWindow.botBubbleColor, config.chatWindow.botTextColor) === 'good' ? 'bg-green-500' :
                  checkContrast(config.chatWindow.botBubbleColor, config.chatWindow.botTextColor) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} title="Contrast ratio" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Window Background */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Window Background
        </label>
        <div className="space-y-4">
          <div className="flex space-x-4">
            {[
              { value: 'solid', label: 'Solid Color' },
              { value: 'transparent', label: 'Transparent' },
              { value: 'gradient', label: 'Gradient' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="backgroundType"
                  value={option.value}
                  checked={config.chatWindow.backgroundType === option.value}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    chatWindow: { ...prev.chatWindow, backgroundType: e.target.value as any }
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-2"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>

          {config.chatWindow.backgroundType === 'solid' && (
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.chatWindow.backgroundColor}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  chatWindow: { ...prev.chatWindow, backgroundColor: e.target.value }
                }))}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={config.chatWindow.backgroundColor}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  chatWindow: { ...prev.chatWindow, backgroundColor: e.target.value }
                }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {config.chatWindow.backgroundType === 'gradient' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Start Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={config.chatWindow.gradientStart}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      chatWindow: { ...prev.chatWindow, gradientStart: e.target.value }
                    }))}
                    className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.chatWindow.gradientStart}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      chatWindow: { ...prev.chatWindow, gradientStart: e.target.value }
                    }))}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">End Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={config.chatWindow.gradientEnd}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      chatWindow: { ...prev.chatWindow, gradientEnd: e.target.value }
                    }))}
                    className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.chatWindow.gradientEnd}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      chatWindow: { ...prev.chatWindow, gradientEnd: e.target.value }
                    }))}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Corner Radius */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Corner Radius: {config.chatWindow.cornerRadius}px
        </label>
        <input
          type="range"
          min="0"
          max="24"
          value={config.chatWindow.cornerRadius}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            chatWindow: { ...prev.chatWindow, cornerRadius: parseInt(e.target.value) }
          }))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Square (0px)</span>
          <span>Rounded (24px)</span>
        </div>
      </div>
    </div>
  );
};

export default ChatWindowSection;