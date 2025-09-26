import React, { useState } from 'react';
import { ExternalLink, Notebook as Robot, Eye, ChevronDown, ChevronRight, Timer, FileType } from 'lucide-react';
import { CrawlerConfig } from '../../../services/crawlerApi';

interface CrawlerAdvancedProps {
  config: Omit<CrawlerConfig, 'id'>;
  setConfig: React.Dispatch<React.SetStateAction<Omit<CrawlerConfig, 'id'>>>;
}

const CrawlerAdvanced: React.FC<CrawlerAdvancedProps> = ({ config, setConfig }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Advanced Options</h3>
        
        <div className="space-y-6">
          {/* External Links */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <ExternalLink className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Follow External Links</h4>
                <p className="text-sm text-gray-600">Crawl links that point to other domains</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.is_crawl_external_link}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  is_crawl_external_link: e.target.checked
                }))}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                config.is_crawl_external_link ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  config.is_crawl_external_link ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </label>
          </div>

          {/* Robots.txt */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Robot className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Respect robots.txt</h4>
                <p className="text-sm text-gray-600">Follow robots.txt directives</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.is_follow_robots_txt}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  is_follow_robots_txt: e.target.checked
                }))}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                config.is_follow_robots_txt ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  config.is_follow_robots_txt ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </label>
          </div>

          {/* Dry Run */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Eye className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Dry Run Mode</h4>
                <p className="text-sm text-gray-600">Preview what will be crawled without indexing</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.is_preview_before_index}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  is_preview_before_index: e.target.checked
                }))}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                config.is_preview_before_index ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  config.is_preview_before_index ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </label>
          </div>
        </div>

        {/* Show Advanced Toggle */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            {showAdvanced ? (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Hide Advanced Settings
              </>
            ) : (
              <>
                <ChevronRight className="w-4 h-4 mr-2" />
                Show Advanced Settings
              </>
            )}
          </button>
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="mt-6 space-y-6">
            {/* Crawl Delay */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Timer className="w-4 h-4 inline mr-2" />
                Crawl Delay (seconds)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={config.delay}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  delay: parseFloat(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Delay between requests to avoid overwhelming the server
              </p>
            </div>

            {/* File Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileType className="w-4 h-4 inline mr-2" />
                File Types to Crawl
              </label>
              <input
                type="text"
                value={config.file_type.join(', ')}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  file_type: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=".html, .pdf, .txt"
              />
            </div>

            {/* Custom Headers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Headers (JSON)
              </label>
              <textarea
                value={config.custom_headers}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  custom_headers: e.target.value
                }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder='{"User-Agent": "ChatLens Bot", "Authorization": "Bearer token"}'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrawlerAdvanced;