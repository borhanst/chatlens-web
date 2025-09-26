import React, { useState, useEffect } from 'react';
import { Search, Calendar, Settings, FileText, Filter, CheckCircle, AlertCircle, Zap, ArrowLeft, XCircle, Clock, X, Plus, ExternalLink, Eye, ChevronDown, ChevronRight, Timer, FileType, RefreshCw, Trash2, Play } from 'lucide-react';
import { createCrawler, updateCrawler, getCrawlers, startCrawl, getCrawlerPages, crawlUrl, CrawlerConfig, CrawlerPage } from '../../services/crawlerApi';
import { useParams, useNavigate } from 'react-router-dom';
import CrawlerOverview from './crawler/CrawlerOverview';
import CrawlerSchedule from './crawler/CrawlerSchedule';
import CrawlerFilters from './crawler/CrawlerFilters';
import CrawlerAdvanced from './crawler/CrawlerAdvanced';
import CrawlerPages from './crawler/CrawlerPages';



const CrawlerSettings = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isCrawling, setIsCrawling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [crawlers, setCrawlers] = useState<CrawlerConfig[]>([]);
  const [currentCrawler, setCurrentCrawler] = useState<CrawlerConfig | null>(null);
  const [crawlerPages, setCrawlerPages] = useState<CrawlerPage[]>([]);
  const [isCrawlingUrl, setIsCrawlingUrl] = useState(false);

  const [config, setConfig] = useState<Omit<CrawlerConfig, 'id'>>({
    is_active: true,
    name: '',
    base_url: '',
    custom_headers: '',
    include_path: [],
    exclude_path: [],
    delay: 1,
    depth: 5,
    file_type: ['.html', '.pdf', '.txt'],
    is_crawl_external_link: false,
    is_follow_robots_txt: true,
    is_preview_before_index: false,
    is_auto_crawl: true,
    schedule_type: 'daily'
  });



  const sections = [
    { id: 'overview', label: 'Crawl Overview', icon: Search },
    { id: 'schedule', label: 'Crawl Schedule', icon: Calendar },
    { id: 'filters', label: 'URL Filters', icon: Filter },
    { id: 'advanced', label: 'Advanced Options', icon: Settings },
    { id: 'pages', label: 'Page-Level Settings', icon: FileText }
  ];

  useEffect(() => {
    if (id) {
      loadSpecificCrawler(parseInt(id));
    } else {
      loadCrawlers();
    }
  }, [id]);

  const loadSpecificCrawler = async (crawlerId: number) => {
    setIsLoading(true);
    try {
      const response = await getCrawlers();
      if (response.success && response.data) {
        const crawler = response.data.find(c => c.id === crawlerId);
        if (crawler) {
          setCurrentCrawler(crawler);
          setConfig(crawler);
          await loadCrawlerPages(crawlerId);
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load crawler' });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCrawlerPages = async (crawlerId: number) => {
    try {
      const response = await getCrawlerPages(crawlerId);
      if (response.success && response.data) {
        setCrawlerPages(response.data);
      }
    } catch (error) {
      console.error('Failed to load crawler pages:', error);
    }
  };

  const handleCrawlPages = async () => {
    if (!currentCrawler?.base_url) return;
    
    setIsCrawlingUrl(true);
    try {
      const response = await crawlUrl(currentCrawler.base_url, currentCrawler?.id);
      if (response.success) {
        setMessage({ type: 'success', text: response.message });
        // Reload pages after crawling
        if (currentCrawler.id) {
          await loadCrawlerPages(currentCrawler.id);
        }
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to crawl pages' });
    } finally {
      setIsCrawlingUrl(false);
    }
  };

  const loadCrawlers = async () => {
    setIsLoading(true);
    try {
      const response = await getCrawlers();
      if (response.success && response.data) {
        setCrawlers(response.data);
        if (response.data.length > 0) {
          setCurrentCrawler(response.data[0]);
          setConfig(response.data[0]);
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load crawlers' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartCrawl = async () => {
    if (!currentCrawler?.id) return;
    
    setIsCrawling(true);
    try {
      const response = await startCrawl(currentCrawler.id);
      if (response.success) {
        setMessage({ type: 'success', text: response.message });
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to start crawl' });
    } finally {
      setIsCrawling(false);
    }
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    setMessage(null);
    
    try {
      let response;
      if (currentCrawler?.id) {
        response = await updateCrawler(currentCrawler.id, config);
      } else {
        response = await createCrawler(config);
      }
      
      if (response.success) {
        setMessage({ type: 'success', text: response.message });
        if (response.data && !currentCrawler) {
          setCurrentCrawler(response.data);
        }
        loadCrawlers();
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save configuration' });
    } finally {
      setIsSaving(false);
    }
  };


  const filteredPages = crawlerPages.filter(page =>
    page.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.page_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'overview':
        return (
          <CrawlerOverview
            isCrawling={isCrawling}
            crawlerPages={crawlerPages}
            onStartCrawl={handleStartCrawl}
          />
        );

      case 'schedule':
        return (
          <CrawlerSchedule
            config={config}
            setConfig={setConfig}
          />
        );

      case 'filters':
        return (
          <CrawlerFilters config={config} setConfig={setConfig} />
        );

      case 'advanced':
        return (
          <CrawlerAdvanced
            config={config}
            setConfig={setConfig}
            />
        );

      case 'pages':
        return (
          <CrawlerPages
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedPages={selectedPages}
            setSelectedPages={setSelectedPages}
            crawlerPages={filteredPages}
            isCrawlingUrl={isCrawlingUrl}
            onCrawlPages={handleCrawlPages}
            currentCrawler={currentCrawler}
            />
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate('/dashboard/crawler')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentCrawler?.name || 'Website Crawler Settings'}
            </h1>
            <p className="text-gray-600">
              Configure how ChatLens crawls and indexes your website content.
            </p>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl flex items-center ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
          )}
          <p className={`text-sm font-inter ${
            message.type === 'success' ? 'text-green-700' : 'text-red-700'
          }`}>
            {message.text}
          </p>
        </div>
      )}

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
        <button 
          onClick={handleSaveConfig}
          disabled={isSaving || isLoading}
          className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Zap className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default CrawlerSettings;