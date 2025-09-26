import React from 'react';
import { Accessibility } from 'lucide-react';
import { WidgetConfig, ConfigUpdateFunction } from './types';

interface TypographySectionProps {
  config: WidgetConfig;
  setConfig: ConfigUpdateFunction;
}

const TypographySection: React.FC<TypographySectionProps> = ({ config, setConfig }) => {
  const fontFamilies = [
    { value: 'Inter', label: 'Inter', preview: 'The quick brown fox' },
    { value: 'Poppins', label: 'Poppins', preview: 'The quick brown fox' },
    { value: 'Montserrat', label: 'Montserrat', preview: 'The quick brown fox' },
    { value: 'System', label: 'System Default', preview: 'The quick brown fox' }
  ];

  return (
    <div className="space-y-6">
      {/* Font Family */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Font Family
        </label>
        <div className="space-y-3">
          {fontFamilies.map((font) => (
            <label key={font.value} className="relative">
              <input
                type="radio"
                name="fontFamily"
                value={font.value}
                checked={config.typography.fontFamily === font.value}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  typography: { ...prev.typography, fontFamily: e.target.value as any }
                }))}
                className="sr-only"
              />
              <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                config.typography.fontFamily === font.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{font.label}</h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: font.value }}>
                      {font.preview}
                    </p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    config.typography.fontFamily === font.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {config.typography.fontFamily === font.value && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Size: {config.typography.fontSize}px
        </label>
        <input
          type="range"
          min="13"
          max="17"
          value={config.typography.fontSize}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            typography: { ...prev.typography, fontSize: parseInt(e.target.value) }
          }))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Small (13px)</span>
          <span>Large (17px)</span>
        </div>
      </div>

      {/* Line Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Line Height
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'tight', label: 'Tight', description: '1.25' },
            { value: 'normal', label: 'Normal', description: '1.5' },
            { value: 'roomy', label: 'Roomy', description: '1.75' }
          ].map((option) => (
            <label key={option.value} className="relative">
              <input
                type="radio"
                name="lineHeight"
                value={option.value}
                checked={config.typography.lineHeight === option.value}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  typography: { ...prev.typography, lineHeight: e.target.value as any }
                }))}
                className="sr-only"
              />
              <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all text-center ${
                config.typography.lineHeight === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-gray-500 mt-1">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Accessibility Mode */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center">
          <Accessibility className="w-5 h-5 text-gray-400 mr-3" />
          <div>
            <h4 className="font-medium text-gray-900">Accessibility Mode</h4>
            <p className="text-sm text-gray-600">Increase font size and contrast for better readability</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.typography.accessibilityMode}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              typography: { ...prev.typography, accessibilityMode: e.target.checked }
            }))}
            className="sr-only"
          />
          <div className={`w-11 h-6 rounded-full transition-colors ${
            config.typography.accessibilityMode ? 'bg-blue-500' : 'bg-gray-300'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
              config.typography.accessibilityMode ? 'translate-x-5' : 'translate-x-0.5'
            } mt-0.5`}></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default TypographySection;