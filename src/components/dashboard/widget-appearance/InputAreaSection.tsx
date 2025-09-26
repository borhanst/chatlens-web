import React from 'react';
import { WidgetConfig, ConfigUpdateFunction } from './types';

interface InputAreaSectionProps {
  config: WidgetConfig;
  setConfig: ConfigUpdateFunction;
  checkContrast: (bg: string, text: string) => 'good' | 'warning' | 'poor';
}

const InputAreaSection: React.FC<InputAreaSectionProps> = ({ config, setConfig, checkContrast }) => {
  return (
    <div className="space-y-6">
      {/* Input Background */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Input Background Color
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={config.inputArea.backgroundColor}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              inputArea: { ...prev.inputArea, backgroundColor: e.target.value }
            }))}
            className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={config.inputArea.backgroundColor}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              inputArea: { ...prev.inputArea, backgroundColor: e.target.value }
            }))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Placeholder Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Placeholder Text Color
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={config.inputArea.placeholderColor}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              inputArea: { ...prev.inputArea, placeholderColor: e.target.value }
            }))}
            className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={config.inputArea.placeholderColor}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              inputArea: { ...prev.inputArea, placeholderColor: e.target.value }
            }))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className={`w-4 h-4 rounded-full ${
            checkContrast(config.inputArea.backgroundColor, config.inputArea.placeholderColor) === 'good' ? 'bg-green-500' :
            checkContrast(config.inputArea.backgroundColor, config.inputArea.placeholderColor) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`} title="Contrast ratio" />
        </div>
      </div>

      {/* Send Button */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Send Button
        </label>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-2">Button Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.inputArea.sendButtonColor}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  inputArea: { ...prev.inputArea, sendButtonColor: e.target.value }
                }))}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={config.inputArea.sendButtonColor}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  inputArea: { ...prev.inputArea, sendButtonColor: e.target.value }
                }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Icon Style</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'arrow', label: 'Arrow', icon: '→' },
                { value: 'paper-plane', label: 'Paper Plane', icon: '✈' },
                { value: 'send', label: 'Send', icon: '📤' }
              ].map((option) => (
                <label key={option.value} className="relative">
                  <input
                    type="radio"
                    name="sendButtonIcon"
                    value={option.value}
                    checked={config.inputArea.sendButtonIcon === option.value}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      inputArea: { ...prev.inputArea, sendButtonIcon: e.target.value as any }
                    }))}
                    className="sr-only"
                  />
                  <div className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                    config.inputArea.sendButtonIcon === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="text-lg mb-1">{option.icon}</div>
                    <div className="text-xs font-medium">{option.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Corner Radius */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Corner Radius: {config.inputArea.cornerRadius}px
        </label>
        <input
          type="range"
          min="0"
          max="16"
          value={config.inputArea.cornerRadius}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            inputArea: { ...prev.inputArea, cornerRadius: parseInt(e.target.value) }
          }))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Square (0px)</span>
          <span>Rounded (16px)</span>
        </div>
      </div>
    </div>
  );
};

export default InputAreaSection;