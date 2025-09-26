import React from 'react';
import { Accessibility, Info } from 'lucide-react';
import { WidgetConfig, ConfigUpdateFunction } from './types';

interface AccessibilitySectionProps {
  config: WidgetConfig;
  setConfig: ConfigUpdateFunction;
}

const AccessibilitySection: React.FC<AccessibilitySectionProps> = ({ config, setConfig }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' }
  ];

  return (
    <div className="space-y-6">
      {/* High Contrast Mode */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center">
          <Accessibility className="w-5 h-5 text-gray-400 mr-3" />
          <div>
            <h4 className="font-medium text-gray-900">High Contrast Mode</h4>
            <p className="text-sm text-gray-600">Enhance contrast for better visibility</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.accessibility.highContrast}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              accessibility: { ...prev.accessibility, highContrast: e.target.checked }
            }))}
            className="sr-only"
          />
          <div className={`w-11 h-6 rounded-full transition-colors ${
            config.accessibility.highContrast ? 'bg-blue-500' : 'bg-gray-300'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
              config.accessibility.highContrast ? 'translate-x-5' : 'translate-x-0.5'
            } mt-0.5`}></div>
          </div>
        </label>
      </div>

      {/* ARIA Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          ARIA Controls
        </label>
        <div className="space-y-3">
          {[
            { value: 'on', label: 'Always On', description: 'Enable all ARIA attributes and labels' },
            { value: 'off', label: 'Disabled', description: 'Disable ARIA attributes (not recommended)' },
            { value: 'automatic', label: 'Automatic', description: 'Enable based on user preferences' }
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="ariaControls"
                value={option.value}
                checked={config.accessibility.ariaControls === option.value}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  accessibility: { ...prev.accessibility, ariaControls: e.target.value as any }
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Language Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Widget Interface Language
        </label>
        <select
          value={config.accessibility.language}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            accessibility: { ...prev.accessibility, language: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          This affects the widget's interface language, not the AI responses.
        </p>
      </div>

      {/* Accessibility Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Accessibility Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure color contrast ratio meets WCAG AA standards (4.5:1)</li>
              <li>• Provide alternative text for all images</li>
              <li>• Support keyboard navigation</li>
              <li>• Use semantic HTML elements</li>
              <li>• Test with screen readers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySection;