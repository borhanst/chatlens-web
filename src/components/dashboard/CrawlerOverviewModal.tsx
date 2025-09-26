import React from 'react';
import { Globe, Calendar, Settings, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { CrawlerConfig } from '../../services/crawlerApi';
import Modal from '../ui/Modal';

interface CrawlerOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  crawler: CrawlerConfig | null;
}

const CrawlerOverviewModal: React.FC<CrawlerOverviewModalProps> = ({ isOpen, onClose, crawler }) => {
  if (!crawler) return null;

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crawler Overview" size="lg">
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-xl font-satoshi font-semibold text-gray-900 mb-2">
              {crawler.name}
            </h4>
            <div className="flex items-center text-gray-600 mb-3">
              <Globe className="w-4 h-4 mr-2" />
              <span className="font-inter">{crawler.base_url}</span>
            </div>
          </div>
          <div className="flex items-center">
            {getStatusIcon(crawler.is_active)}
            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(crawler.is_active)}`}>
              {crawler.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Settings className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Depth</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{crawler.depth}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Clock className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Delay</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{crawler.delay}s</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <FileText className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">File Types</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{crawler.file_type.length}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Schedule</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 capitalize">{crawler.schedule_type}</p>
          </div>
        </div>

        {/* Configuration Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* URL Filters */}
          <div>
            <h5 className="font-satoshi font-semibold text-gray-900 mb-3">URL Filters</h5>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Include Paths:</span>
                <div className="mt-1">
                  {crawler.include_path?.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {crawler.include_path.map((path, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          {path}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">All paths</span>
                  )}
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-600">Exclude Paths:</span>
                <div className="mt-1">
                  {crawler.exclude_path.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {crawler.exclude_path.map((path, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                          {path}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <h5 className="font-satoshi font-semibold text-gray-900 mb-3">Advanced Settings</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">External Links</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  crawler.is_crawl_external_link ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {crawler.is_crawl_external_link ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Robots.txt</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  crawler.is_follow_robots_txt ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {crawler.is_follow_robots_txt ? 'Respect' : 'Ignore'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Auto Crawl</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  crawler.is_auto_crawl ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {crawler.is_auto_crawl ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Preview Mode</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  crawler.is_preview_before_index ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {crawler.is_preview_before_index ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* File Types */}
        <div>
          <h5 className="font-satoshi font-semibold text-gray-900 mb-3">Supported File Types</h5>
          <div className="flex flex-wrap gap-2">
            {crawler.file_type.map((type, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Custom Headers */}
        {crawler.custom_headers && (
          <div>
            <h5 className="font-satoshi font-semibold text-gray-900 mb-3">Custom Headers</h5>
            <div className="bg-gray-50 rounded-xl p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {crawler.custom_headers || 'None'}
              </pre>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CrawlerOverviewModal;