import React from 'react';
import { Info } from 'lucide-react';
import { CrawlerConfig } from '../../../services/crawlerApi';

interface CrawlerScheduleProps {
  config: Omit<CrawlerConfig, 'id'>;
  setConfig: React.Dispatch<React.SetStateAction<Omit<CrawlerConfig, 'id'>>>;
}

const CrawlerSchedule: React.FC<CrawlerScheduleProps> = ({ config, setConfig }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Crawl Schedule</h3>
        
        <div className="space-y-6">
          {/* Auto-crawl Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Enable Auto-crawl</h4>
              <p className="text-sm text-gray-600">Automatically crawl your website on a schedule</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.is_auto_crawl}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  is_auto_crawl: e.target.checked
                }))}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                config.is_auto_crawl ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  config.is_auto_crawl ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </label>
          </div>

          {/* Frequency Selection */}
          {config.is_auto_crawl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Crawl Frequency
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'manual', label: 'Manual Only' },
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' }
                ].map((option) => (
                  <label key={option.value} className="relative">
                    <input
                      type="radio"
                      name="frequency"
                      value={option.value}
                      checked={config.schedule_type === option.value}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        schedule_type: e.target.value as any
                      }))}
                      className="sr-only"
                    />
                    <div className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                      config.schedule_type === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Next Crawl Preview */}
          {config.is_auto_crawl && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Info className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <h4 className="font-medium text-blue-900">Next Scheduled Crawl</h4>
                  <p className="text-sm text-blue-700">
                    {new Date(Date.now() + 24*60*60*1000).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrawlerSchedule;