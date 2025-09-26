import React, { useState, useEffect } from 'react';
import { Plus, Search, Globe, Calendar, Settings, Play, Pause, Trash2, Eye, ChevronRight } from 'lucide-react';
import { getCrawlers, CrawlerConfig } from '../../services/crawlerApi';
import { useNavigate } from 'react-router-dom';
import CrawlerOverviewModal from './CrawlerOverviewModal';

const CrawlerList = () => {
  const navigate = useNavigate();
  const [crawlers, setCrawlers] = useState<CrawlerConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrawler, setSelectedCrawler] = useState<CrawlerConfig | null>(null);
  const [showOverviewModal, setShowOverviewModal] = useState(false);

  useEffect(() => {
    loadCrawlers();
  }, []);

  const loadCrawlers = async () => {
    setIsLoading(true);
    try {
      const response = await getCrawlers();
      if (response.success && response.data) {
        setCrawlers(response.data);
      }
    } catch (error) {
      console.error('Failed to load crawlers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCrawlers = crawlers.filter(crawler =>
    crawler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crawler.base_url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-satoshi font-bold text-gray-900 mb-2">Website Crawlers</h1>
          <p className="text-gray-600 font-inter">Manage your website crawling configurations</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/crawler/create')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl font-inter font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Crawler
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search crawlers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-inter"
          />
        </div>
      </div>

      {/* Crawler List */}
      <div className="space-y-4">
        {filteredCrawlers.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-satoshi font-semibold text-gray-900 mb-2">No crawlers found</h3>
            <p className="text-gray-600 font-inter mb-4">
              {searchTerm ? 'No crawlers match your search.' : 'Get started by creating your first crawler.'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate('/dashboard/crawler/create')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl font-inter font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Crawler
              </button>
            )}
          </div>
        ) : (
          filteredCrawlers.map((crawler) => (
            <div
              key={crawler.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/dashboard/crawler/${crawler.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-satoshi font-semibold text-gray-900 mr-3">
                      {crawler.name}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(crawler.is_active)}`}>
                      {crawler.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="font-inter">{crawler.base_url}</span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="font-inter">
                        Schedule: {crawler.schedule_type}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Settings className="w-4 h-4 mr-1" />
                      <span className="font-inter">
                        Depth: {crawler.depth}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-inter">
                        Paths: {crawler.include_path?.length} included, {crawler.exclude_path?.length} excluded
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCrawler(crawler);
                      setShowOverviewModal(true);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle start/pause
                    }}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Overview Modal */}
      <CrawlerOverviewModal
        isOpen={showOverviewModal}
        onClose={() => {
          setShowOverviewModal(false);
          setSelectedCrawler(null);
        }}
        crawler={selectedCrawler}
      />
    </div>
  );
};

export default CrawlerList;