import React from 'react';
import { Check } from 'lucide-react';
import { WidgetConfig, ConfigUpdateFunction } from './types';

interface AdvancedSectionProps {
  config: WidgetConfig;
  setConfig: ConfigUpdateFunction;
}

const AdvancedSection: React.FC<AdvancedSectionProps> = ({ config, setConfig }) => {
  return (
    <div className="space-y-6">
      {/* Custom CSS Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Custom CSS
        </label>
        <div className="border border-gray-300 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">CSS Editor</span>
            <div className="flex items-center space-x-2">
              <button className="text-xs text-blue-600 hover:text-blue-700">
                Format Code
              </button>
              <button className="text-xs text-gray-500 hover:text-gray-700">
                Reset
              </button>
            </div>
          </div>
          <textarea
            value={config.advanced.customCSS}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              advanced: { ...prev.advanced, customCSS: e.target.value }
            }))}
            rows={12}
            className="w-full p-4 font-mono text-sm bg-gray-900 text-green-400 focus:outline-none resize-none"
            placeholder="/* Add your custom CSS here */
.chat-widget {
  /* Custom styles */
}

.chat-message {
  /* Message styling */
}

.chat-input {
  /* Input styling */
}"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Advanced users can add custom CSS to override default styles. Changes apply in real-time to the preview.
        </p>
      </div>

      {/* CSS Selectors Documentation */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-medium text-gray-900 mb-3">Available CSS Selectors</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Widget Structure</h5>
            <ul className="space-y-1 text-gray-600 font-mono">
              <li>.chat-widget</li>
              <li>.chat-launcher</li>
              <li>.chat-window</li>
              <li>.chat-header</li>
              <li>.chat-messages</li>
              <li>.chat-input-area</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Message Elements</h5>
            <ul className="space-y-1 text-gray-600 font-mono">
              <li>.chat-message</li>
              <li>.chat-message.user</li>
              <li>.chat-message.bot</li>
              <li>.message-bubble</li>
              <li>.message-text</li>
              <li>.message-timestamp</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Complete Documentation →
          </a>
        </div>
      </div>

      {/* CSS Validation */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-3" />
          <div>
            <h4 className="font-medium text-green-900">CSS Validation</h4>
            <p className="text-sm text-green-800">Your custom CSS is valid and will be applied to the widget.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSection;