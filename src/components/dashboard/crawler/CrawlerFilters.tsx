import React from 'react';
import { Plus, X } from 'lucide-react';
import { CrawlerConfig } from '../../../services/crawlerApi';

interface CrawlerFiltersProps {
  config: Omit<CrawlerConfig, 'id'>;
  setConfig: React.Dispatch<React.SetStateAction<Omit<CrawlerConfig, 'id'>>>;
}

const CrawlerFilters: React.FC<CrawlerFiltersProps> = ({ config, setConfig }) => {
  const addIncludePath = (path: string) => {
    if (path && !config.include_path?.includes(path)) {
      setConfig(prev => ({
        ...prev,
        include_path: [...prev.include_path, path]
      }));
    }
  };

  const removeIncludePath = (path: string) => {
    setConfig(prev => ({
      ...prev,
      include_path: prev.include_path.filter(p => p !== path)
    }));
  };

  const addExcludePath = (path: string) => {
    if (path && !config.exclude_path.includes(path)) {
      setConfig(prev => ({
        ...prev,
        exclude_path: [...prev.exclude_path, path]
      }));
    }
  };

  const removeExcludePath = (path: string) => {
    setConfig(prev => ({
      ...prev,
      exclude_path: prev.exclude_path.filter(p => p !== path)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Include Paths */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Include Paths</h3>
        <p className="text-sm text-gray-600 mb-4">
          Specify which paths to crawl. Leave empty to crawl all paths.
        </p>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {config.include_path?.map((path, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {path}
                <button
                  onClick={() => removeIncludePath(path)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          
          <div className="flex">
            <input
              type="text"
              placeholder="e.g., /blog, /docs, /products"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addIncludePath(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                addIncludePath(input.value);
                input.value = '';
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Exclude Paths */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Exclude Paths</h3>
        <p className="text-sm text-gray-600 mb-4">
          Specify paths to exclude from crawling.
        </p>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {config.exclude_path?.map((path, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
              >
                {path}
                <button
                  onClick={() => removeExcludePath(path)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          
          <div className="flex">
            <input
              type="text"
              placeholder="e.g., /admin, /login, /checkout"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addExcludePath(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                addExcludePath(input.value);
                input.value = '';
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Crawl Depth */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Crawl Depth</h3>
        <p className="text-sm text-gray-600 mb-4">
          Maximum number of links to follow from the starting page.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 w-16">Depth:</span>
            <input
              type="range"
              min="1"
              max="10"
              value={config.depth}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                depth: parseInt(e.target.value)
              }))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm font-medium text-gray-900 w-8">
              {config.depth}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Shallow (1)</span>
            <span>Deep (10)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrawlerFilters;