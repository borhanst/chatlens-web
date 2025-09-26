import React from 'react';
import { Bot, Image, Monitor, Upload } from 'lucide-react';
import { WidgetConfig, ConfigUpdateFunction } from './types';

interface HeaderSectionProps {
  config: WidgetConfig;
  setConfig: ConfigUpdateFunction;
  onFileUpload: (type: 'avatar' | 'logo' | 'banner') => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ config, setConfig, onFileUpload }) => {
  return (
    <div className="space-y-6">
      {/* Header Elements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Header Elements
        </label>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <Bot className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Show Avatar</h4>
                <p className="text-sm text-gray-600">Display bot avatar in chat header</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.header.showAvatar}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  header: { ...prev.header, showAvatar: e.target.checked }
                }))}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                config.header.showAvatar ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  config.header.showAvatar ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <Image className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Show Logo</h4>
                <p className="text-sm text-gray-600">Display company logo in header</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.header.showLogo}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  header: { ...prev.header, showLogo: e.target.checked }
                }))}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                config.header.showLogo ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  config.header.showLogo ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <Monitor className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Show Banner</h4>
                <p className="text-sm text-gray-600">Display banner image in header</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.header.showBanner}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  header: { ...prev.header, showBanner: e.target.checked }
                }))}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                config.header.showBanner ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  config.header.showBanner ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Image Uploads */}
      {(config.header.showAvatar || config.header.showLogo || config.header.showBanner) && (
        <div className="space-y-4">
          {config.header.showAvatar && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar Image
              </label>
              <button
                onClick={() => onFileUpload('avatar')}
                className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload avatar image</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </button>
            </div>
          )}

          {config.header.showLogo && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Image
              </label>
              <button
                onClick={() => onFileUpload('logo')}
                className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload logo image</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </button>
            </div>
          )}

          {config.header.showBanner && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Image
              </label>
              <button
                onClick={() => onFileUpload('banner')}
                className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload banner image</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Alt Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Accessibility Alt Text
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={config.header.altText}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            header: { ...prev.header, altText: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the image for screen readers"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Required for accessibility compliance. Describe what the image shows.
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;