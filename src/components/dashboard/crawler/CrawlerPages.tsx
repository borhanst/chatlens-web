import React from 'react';
import { Search, RefreshCw, Trash2, Eye, FileText, Play, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import { CrawlerPage } from '../../../services/crawlerApi';

interface CrawlerPagesProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPages: string[];
  setSelectedPages: (pages: string[]) => void;
  crawlerPages: CrawlerPage[];
  isCrawlingUrl: boolean;
  onCrawlPages: () => void;
  currentCrawler: any;
}

const CrawlerPages: React.FC<CrawlerPagesProps> = ({
  searchTerm,
  setSearchTerm,
  selectedPages,
  setSelectedPages,
  crawlerPages,
  isCrawlingUrl,
  onCrawlPages,
  currentCrawler
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'indexed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'skipped':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'crawl':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'indexed':
        return 'text-green-600 bg-green-50';
      case 'skipped':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'crawl':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredPages = crawlerPages.filter(page =>
    page.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.page_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <RefreshCw className="w-4 h-4 mr-2 inline" />
              Re-index Selected
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              <Trash2 className="w-4 h-4 mr-2 inline" />
              Remove Selected
            </button>
          </div>
        </div>

        {/* Pages Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPages(filteredPages.map(p => p.id.toString()));
                      } else {
                        setSelectedPages([]);
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">URL</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Words</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Last Crawled</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedPages.includes(page.id.toString())}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPages([...selectedPages, page.id.toString()]);
                        } else {
                          setSelectedPages(selectedPages.filter(id => id !== page.id.toString()));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{page.page_title}</div>
                      <div className="text-sm text-gray-500">{page.path}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}>
                      {getStatusIcon(page.status)}
                      <span className="ml-1 capitalize">{page.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{page.content?.split(' ').length.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="mb-4">{crawlerPages.length === 0 ? 'No pages have been crawled yet.' : 'No pages found matching your search.'}</p>
            {crawlerPages.length === 0 && currentCrawler?.base_url && (
              <button
                onClick={onCrawlPages}
                disabled={isCrawlingUrl}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isCrawlingUrl ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Crawling...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Crawl Pages
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrawlerPages;