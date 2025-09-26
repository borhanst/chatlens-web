import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Globe, Settings, Filter, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createCrawler, CrawlerConfig } from '../../services/crawlerApi';

const CreateCrawler = () => {
  const navigate = useNavigate();
  const [showMultiStep, setShowMultiStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdCrawler, setCreatedCrawler] = useState<CrawlerConfig | null>(null);

  const [formData, setFormData] = useState<Omit<CrawlerConfig, 'id'>>({
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

  const steps = [
    { id: 1, title: 'Basic Info', icon: Globe },
    { id: 2, title: 'URL Filters', icon: Filter },
    { id: 3, title: 'Advanced', icon: Settings },
    { id: 4, title: 'Schedule', icon: Calendar }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleQuickCreate = async () => {
    if (!formData.base_url) return;
    
    setIsLoading(true);
    setError('');

    const quickData = {
      ...formData,
      name: formData.name || new URL(formData.base_url).hostname
    };

    try {
      const response = await createCrawler(quickData);
      if (response.success) {
        setCreatedCrawler(response.data);
        setFormData(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to create crawler');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSettings = async () => {
    if (!createdCrawler?.id) return;
    
    setIsLoading(true);
    setError('');

    try {
      const response = await updateCrawler(createdCrawler.id, formData);
      if (response.success) {
        navigate('/dashboard/crawler');
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to update crawler');
    } finally {
      setIsLoading(false);
    }
  };

  const addPath = (type: 'include' | 'exclude', path: string) => {
    if (!path) return;
    const field = type === 'include' ? 'include_path' : 'exclude_path';
    if (!formData[field].includes(path)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], path]
      }));
    }
  };

  const removePath = (type: 'include' | 'exclude', path: string) => {
    const field = type === 'include' ? 'include_path' : 'exclude_path';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(p => p !== path)
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crawler Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="My Website Crawler"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base URL *
              </label>
              <input
                type="url"
                value={formData.base_url}
                onChange={(e) => setFormData(prev => ({ ...prev, base_url: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Headers (JSON)
              </label>
              <textarea
                value={formData.custom_headers}
                onChange={(e) => setFormData(prev => ({ ...prev, custom_headers: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder='{"User-Agent": "ChatLens Bot"}'
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Include Paths
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {formData.include_path?.map((path, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {path}
                      <button
                        onClick={() => removePath('include', path)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="/blog, /docs"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addPath('include', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addPath('include', input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-xl hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Exclude Paths
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {formData.exclude_path.map((path, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {path}
                      <button
                        onClick={() => removePath('exclude', path)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="/admin, /login"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addPath('exclude', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addPath('exclude', input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-xl hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crawl Depth: {formData.depth}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.depth}
                onChange={(e) => setFormData(prev => ({ ...prev, depth: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-medium text-gray-900">Follow External Links</h4>
                <p className="text-sm text-gray-600">Crawl links pointing to other domains</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_crawl_external_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_crawl_external_link: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${formData.is_crawl_external_link ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${formData.is_crawl_external_link ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-medium text-gray-900">Respect robots.txt</h4>
                <p className="text-sm text-gray-600">Follow robots.txt directives</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_follow_robots_txt}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_follow_robots_txt: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${formData.is_follow_robots_txt ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${formData.is_follow_robots_txt ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crawl Delay (seconds): {formData.delay}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={formData.delay}
                onChange={(e) => setFormData(prev => ({ ...prev, delay: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Types
              </label>
              <input
                type="text"
                value={formData.file_type.join(', ')}
                onChange={(e) => setFormData(prev => ({ ...prev, file_type: e.target.value.split(',').map(t => t.trim()).filter(t => t) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=".html, .pdf, .txt"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-medium text-gray-900">Enable Auto-crawl</h4>
                <p className="text-sm text-gray-600">Automatically crawl on schedule</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_auto_crawl}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_auto_crawl: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${formData.is_auto_crawl ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${formData.is_auto_crawl ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                </div>
              </label>
            </div>

            {formData.is_auto_crawl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Schedule Frequency
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'manual', label: 'Manual' },
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' }
                  ].map((option) => (
                    <label key={option.value} className="relative">
                      <input
                        type="radio"
                        name="schedule"
                        value={option.value}
                        checked={formData.schedule_type === option.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, schedule_type: e.target.value as any }))}
                        className="sr-only"
                      />
                      <div className={`p-3 border-2 rounded-xl cursor-pointer transition-all text-center ${
                        formData.schedule_type === option.value
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
          </div>
        );

      default:
        return null;
    }
  };

  if (!showMultiStep && !createdCrawler) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/dashboard/crawler')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-satoshi font-bold text-gray-900 mb-2">Create New Crawler</h1>
            <p className="text-gray-600 font-inter">Enter your website URL to get started</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Quick Create Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL *
              </label>
              <input
                type="url"
                value={formData.base_url}
                onChange={(e) => setFormData(prev => ({ ...prev, base_url: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crawler Name (optional)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Will auto-generate from URL if empty"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleQuickCreate}
              disabled={!formData.base_url || isLoading}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              Create Crawler
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (createdCrawler && !showMultiStep) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/dashboard/crawler')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-satoshi font-bold text-gray-900 mb-2">Crawler Created!</h1>
            <p className="text-gray-600 font-inter">Your crawler is ready with default settings</p>
          </div>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-satoshi font-semibold text-gray-900 mb-2">
              {createdCrawler.name}
            </h3>
            <p className="text-gray-600 font-inter">{createdCrawler.base_url}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setShowMultiStep(true)}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Update Crawler Settings
            </button>
            
            <button
              onClick={() => navigate('/dashboard/crawler')}
              className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              View All Crawlers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => setShowMultiStep(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-satoshi font-bold text-gray-900 mb-2">Update Crawler Settings</h1>
          <p className="text-gray-600 font-inter">Configure advanced settings for {createdCrawler?.name}</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  isCompleted ? 'bg-blue-500 border-blue-500 text-white' :
                  isActive ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    Step {step.id}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-blue-500' : 'bg-gray-300'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Form Content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        {currentStep < steps.length ? (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleUpdateSettings}
            disabled={isLoading}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Check className="w-4 h-4 mr-2" />
            )}
            Update Settings
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateCrawler;