import React from 'react';
import { Clock, FileText, Calendar, Play, RefreshCw, Eye, Download } from 'lucide-react';

interface CrawlerOverviewProps {
  isCrawling: boolean;
  crawlerPages: any[];
  onStartCrawl: () => void;
}

const CrawlerOverview: React.FC<CrawlerOverviewProps> = ({ isCrawling, crawlerPages, onStartCrawl }) => {
  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              isCrawling ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
            }`}>
              {isCrawling ? 'crawling' : 'idle'}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Last Crawl</h3>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleTimeString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Pages Indexed</h3>
          <p className="text-2xl font-bold text-gray-900">{crawlerPages.length}</p>
          <p className="text-sm text-green-600">{crawlerPages.filter(p => p.status === 'indexed').length} indexed</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Next Scheduled</h3>
          <p className="text-lg font-semibold text-gray-900">
            {new Date(Date.now() + 24*60*60*1000).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(Date.now() + 24*60*60*1000).toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Crawl Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Crawl Actions</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onStartCrawl}
            disabled={isCrawling}
            className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCrawling ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Crawling...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Re-crawl Now
              </>
            )}
          </button>
          
          <button className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
            <Eye className="w-4 h-4 mr-2" />
            Preview Changes
          </button>
          
          <button className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrawlerOverview;