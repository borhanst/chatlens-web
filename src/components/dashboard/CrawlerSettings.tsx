import React, { useState } from 'react';
import { Search, Calendar, Link, Settings, FileText, ChevronDown, ChevronRight, Play, Clock, Globe, Filter, Download, RefreshCw, Plus, X, Eye, Trash2, CheckCircle, AlertCircle, XCircle, Info, ExternalLink, Notebook as Robot, Timer, FileType, Zap } from 'lucide-react';

interface CrawlPage {
  id: string;
  url: string;
  status: 'indexed' | 'skipped' | 'error';
  wordCount: number;
  lastCrawled: string;
  title: string;
}

interface CrawlerConfig {
  overview: {
    lastCrawl: string;
    pagesIndexed: number;
    nextScheduled: string;
    status: 'idle' | 'crawling' | 'error';
  };
  schedule: {
    frequency: 'manual' | 'daily' | 'weekly' | 'monthly';
    autoCrawl: boolean;
    nextCrawl: string;
  };
  urlFilters: {
    includePaths: string[];
    excludePaths: string[];
    excludeKeywords: string[];
    crawlDepth: number;
  };
  advanced: {
    followExternalLinks: boolean;
    respectRobotsTxt: boolean;
    customHeaders: string;
    crawlDelay: number;
    fileTypes: string[];
    dryRun: boolean;
  };
}

const CrawlerSettings = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isCrawling, setIsCrawling] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [config, setConfig] = useState<CrawlerConfig>({
    overview: {
      lastCrawl: '2024-12-15 14:30:00',
      pagesIndexed: 247,
      nextScheduled: '2024-12-16 02:00:00',
      status: 'idle'
    },
    schedule: {
      frequency: 'daily',
      autoCrawl: true,
      nextCrawl: '2024-12-16 02:00:00'
    },
    urlFilters: {
      includePaths: ['/blog', '/docs', '/products'],
      excludePaths: ['/admin', '/login', '/checkout'],
      excludeKeywords: ['private', 'internal', 'test'],
      crawlDepth: 5
    },
    advanced: {
      followExternalLinks: false,
      respectRobotsTxt: true,
      customHeaders: '',
      crawlDelay: 1,
      fileTypes: ['.html', '.pdf', '.txt'],
      dryRun: false
    }
  });

  const [crawledPages] = useState<CrawlPage[]>([
    {
      id: '1',
      url: '/blog/getting-started',
      status: 'indexed',
      wordCount: 1250,
      lastCrawled: '2024-12-15 14:30:00',
      title: 'Getting Started with ChatLens'
    },
    {
      id: '2',
      url: '/docs/api-reference',
      status: 'indexed',
      wordCount: 3400,
      lastCrawled: '2024-12-15 14:31:00',
      title: 'API Reference Documentation'
    },
    {
      id: '3',
      url: '/products/enterprise',
      status: 'skipped',
      wordCount: 0,
      lastCrawled: '2024-12-15 14:32:00',
      title: 'Enterprise Solutions'
    },
    {
      id: '4',
      url: '/blog/advanced-features',
      status: 'error',
      wordCount: 0,
      lastCrawled: '2024-12-15 14:33:00',
      title: 'Advanced Features Guide'
    },
    {
      id: '5',
      url: '/docs/integration',
      status: 'indexed',
      wordCount: 2100,
      lastCrawled: '2024-12-15 14:34:00',
      title: 'Integration Guide'
    }
  ]);

  const sections = [
    { id: 'overview', label: 'Crawl Overview', icon: Search },
    { id: 'schedule', label: 'Crawl Schedule', icon: Calendar },
    { id: 'filters', label: 'URL Filters', icon: Filter },
    { id: 'advanced', label: 'Advanced Options', icon: Settings },
    { id: 'pages', label: 'Page-Level Settings', icon: FileText }
  ];

  const handleStartCrawl = async () => {
    setIsCrawling(true);
    // Simulate crawling process
    setTimeout(() => {
      setIsCrawling(false);
      setConfig(prev => ({
        ...prev,
        overview: {
          ...prev.overview,
          lastCrawl: new Date().toISOString().slice(0, 19).replace('T', ' '),
          status: 'idle'
        }
      }));
    }, 3000);
  };

  const addIncludePath = (path: string) => {
    if (path && !config.urlFilters.includePaths.includes(path)) {
      setConfig(prev => ({
        ...prev,
        urlFilters: {
          ...prev.urlFilters,
          includePaths: [...prev.urlFilters.includePaths, path]
        }
      }));
    }
  };

  const removeIncludePath = (path: string) => {
    setConfig(prev => ({
      ...prev,
      urlFilters: {
        ...prev.urlFilters,
        includePaths: prev.urlFilters.includePaths.filter(p => p !== path)
      }
    }));
  };

  const addExcludePath = (path: string) => {
    if (path && !config.urlFilters.excludePaths.includes(path)) {
      setConfig(prev => ({
        ...prev,
        urlFilters: {
          ...prev.urlFilters,
          excludePaths: [...prev.urlFilters.excludePaths, path]
        }
      }));
    }
  };

  const removeExcludePath = (path: string) => {
    setConfig(prev => ({
      ...prev,
      urlFilters: {
        ...prev.urlFilters,
        excludePaths: prev.urlFilters.excludePaths.filter(p => p !== path)
      }
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'indexed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'skipped':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
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
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredPages = crawledPages.filter(page =>
    page.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'overview':
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
                    config.overview.status === 'idle' ? 'bg-green-100 text-green-700' :
                    config.overview.status === 'crawling' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {config.overview.status}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Last Crawl</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(config.overview.lastCrawl).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(config.overview.lastCrawl).toLocaleTimeString()}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Pages Indexed</h3>
                <p className="text-2xl font-bold text-gray-900">{config.overview.pagesIndexed}</p>
                <p className="text-sm text-green-600">+12 since last crawl</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Next Scheduled</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(config.overview.nextScheduled).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(config.overview.nextScheduled).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Crawl Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Crawl Actions</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartCrawl}
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

      case 'schedule':
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
                      checked={config.schedule.autoCrawl}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        schedule: { ...prev.schedule, autoCrawl: e.target.checked }
                      }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      config.schedule.autoCrawl ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        config.schedule.autoCrawl ? 'translate-x-5' : 'translate-x-0.5'
                      } mt-0.5`}></div>
                    </div>
                  </label>
                </div>

                {/* Frequency Selection */}
                {config.schedule.autoCrawl && (
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
                            checked={config.schedule.frequency === option.value}
                            onChange={(e) => setConfig(prev => ({
                              ...prev,
                              schedule: { ...prev.schedule, frequency: e.target.value as any }
                            }))}
                            className="sr-only"
                          />
                          <div className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                            config.schedule.frequency === option.value
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
                {config.schedule.autoCrawl && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Info className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <h4 className="font-medium text-blue-900">Next Scheduled Crawl</h4>
                        <p className="text-sm text-blue-700">
                          {new Date(config.schedule.nextCrawl).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'filters':
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
                  {config.urlFilters.includePaths.map((path, index) => (
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
                  {config.urlFilters.excludePaths.map((path, index) => (
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
                    value={config.urlFilters.crawlDepth}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      urlFilters: { ...prev.urlFilters, crawlDepth: parseInt(e.target.value) }
                    }))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-sm font-medium text-gray-900 w-8">
                    {config.urlFilters.crawlDepth}
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

      case 'advanced':
        return (
          <div className="space-y-6">
            {/* Basic Advanced Options */}
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
                      checked={config.advanced.followExternalLinks}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, followExternalLinks: e.target.checked }
                      }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      config.advanced.followExternalLinks ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        config.advanced.followExternalLinks ? 'translate-x-5' : 'translate-x-0.5'
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
                      checked={config.advanced.respectRobotsTxt}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, respectRobotsTxt: e.target.checked }
                      }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      config.advanced.respectRobotsTxt ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        config.advanced.respectRobotsTxt ? 'translate-x-5' : 'translate-x-0.5'
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
                      checked={config.advanced.dryRun}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, dryRun: e.target.checked }
                      }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      config.advanced.dryRun ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        config.advanced.dryRun ? 'translate-x-5' : 'translate-x-0.5'
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
                      value={config.advanced.crawlDelay}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, crawlDelay: parseFloat(e.target.value) }
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
                      value={config.advanced.fileTypes.join(', ')}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        advanced: {
                          ...prev.advanced,
                          fileTypes: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                        }
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
                      value={config.advanced.customHeaders}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, customHeaders: e.target.value }
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

      case 'pages':
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
                              setSelectedPages(filteredPages.map(p => p.id));
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
                            checked={selectedPages.includes(page.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPages([...selectedPages, page.id]);
                              } else {
                                setSelectedPages(selectedPages.filter(id => id !== page.id));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{page.title}</div>
                            <div className="text-sm text-gray-500">{page.url}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}>
                            {getStatusIcon(page.status)}
                            <span className="ml-1 capitalize">{page.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-900">{page.wordCount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-gray-500 text-sm">
                          {new Date(page.lastCrawled).toLocaleDateString()}
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
                  <p>No pages found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Website Crawler Settings</h1>
        <p className="text-gray-600">
          Configure how ChatLens crawls and indexes your website content.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`transition-all duration-300 ${
              activeSection === section.id ? 'block' : 'hidden'
            }`}
          >
            {renderSection(section.id)}
          </div>
        ))}
      </div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-6 right-6">
        <button className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium shadow-lg transition-colors">
          <Zap className="w-4 h-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default CrawlerSettings;