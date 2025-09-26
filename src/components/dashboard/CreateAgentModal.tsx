import { useState } from 'react';
import { X, Globe, Check, Trash2 } from 'lucide-react';
import { createAgentWithPages, CrawlerPage } from '../../services/crawlerApi';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (pages: CrawlerPage[]) => void;
}

export const CreateAgentModal = ({ isOpen, onClose, onSuccess }: CreateAgentModalProps) => {
  const [websiteDomain, setWebsiteDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pages, setPages] = useState<CrawlerPage[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [step, setStep] = useState<'domain' | 'pages'>('domain');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteDomain.trim()) return;

    setLoading(true);
    setError('');

    try {
      const result = await createAgentWithPages(websiteDomain);
      console.log(result);
      
      if (result.success && result.data) {
        setPages(result.data);
        setSelectedPages(new Set(result.data.map(p => p.id)));
        setStep('pages');
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.log(err);
      
      setError('Failed to create agent');
    } finally {
      setLoading(false);
    }
  };

  const handlePageToggle = (pageId: number) => {
    setPages(prev => prev.filter(p => p.id !== pageId));
    setSelectedPages(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(pageId);
      return newSelected;
    });
  };

  const handleCreateAgent = () => {
    onSuccess(pages);
    handleClose();
  };

  const handleClose = () => {
    setWebsiteDomain('');
    setPages([]);
    setSelectedPages(new Set());
    setStep('domain');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="font-poppins font-semibold text-gray-900">
            {step === 'domain' ? 'Create New Agent' : 'Select Pages to Scrape'}
          </h3>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'domain' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Domain
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={websiteDomain}
                    onChange={(e) => setWebsiteDomain(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !websiteDomain.trim()}
                  className="flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Creating...
                    </>
                  ) : (
                    'Create Agent'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                Pages to include for scraping ({pages.length} pages)
              </p>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{page.page_title}</div>
                      <div className="text-sm text-gray-500">{page.path}</div>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          page.status === 'indexed' ? 'bg-green-100 text-green-800' :
                          page.status === 'crawl' ? 'bg-blue-100 text-blue-800' :
                          page.status === 'error' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {page.status}
                        </span>
                        {page.response_status && (
                          <span className="ml-2 text-xs text-gray-500">
                            {page.response_status}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handlePageToggle(page.id)}
                      className="ml-3 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setStep('domain')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Back
                </button>
                <button
                  onClick={handleCreateAgent}
                  disabled={pages.length === 0}
                  className="flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Create Agent ({pages.length} pages)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};