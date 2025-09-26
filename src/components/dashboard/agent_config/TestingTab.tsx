import React from 'react';
import { TestTube, Play, Eye, Copy } from 'lucide-react';
import { ConfigData } from './types';
import { ConfigSection } from '../../ui/ConfigSection';

interface TestingTabProps {
  config: ConfigData;
  setShowPreview: (show: boolean) => void;
}

export const TestingTab: React.FC<TestingTabProps> = ({ config, setShowPreview }) => (
  <ConfigSection title="Test & Preview Your Bot" icon={TestTube} iconColor="text-indigo-600">
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
      <h4 className="text-lg font-poppins font-semibold text-gray-900 mb-4">Live Bot Preview</h4>
      <p className="text-gray-600 font-inter mb-6">
        Test your bot configuration in real-time to see how it will interact with your users.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-inter font-medium transition-colors"
        >
          <Play className="w-4 h-4 mr-2" />
          Open Test Chat
        </button>
        
        <button className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-inter font-medium transition-colors">
          <Eye className="w-4 h-4 mr-2" />
          Preview Widget
        </button>
      </div>
    </div>

    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
      <h4 className="text-lg font-poppins font-semibold text-gray-900 mb-4">Embed Code</h4>
      <p className="text-gray-600 font-inter mb-4">
        Copy this code and paste it into your website's HTML to deploy your chatbot.
      </p>
      
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-green-400">HTML Embed Code</span>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <code className="text-gray-300">
          {`<script src="https://cdn.chatlens.com/widget.js"></script>
<script>
  ChatLens.init({
    agentId: "your-agent-id",
    domain: "${config.general.websiteDomain}"
  });
</script>`}
        </code>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <h4 className="text-lg font-poppins font-semibold text-gray-900 mb-2">Configuration Status</h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm font-inter text-gray-700">General settings configured</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm font-inter text-gray-700">Personality defined</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-sm font-inter text-gray-700">Content crawling pending</span>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
        <h4 className="text-lg font-poppins font-semibold text-gray-900 mb-2">Performance Metrics</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-inter text-gray-700">Response Speed</span>
            <span className="text-sm font-inter font-semibold text-green-600">1.2s avg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-inter text-gray-700">Accuracy Score</span>
            <span className="text-sm font-inter font-semibold text-blue-600">94%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-inter text-gray-700">Knowledge Base</span>
            <span className="text-sm font-inter font-semibold text-purple-600">247 pages</span>
          </div>
        </div>
      </div>
    </div>
  </ConfigSection>
);