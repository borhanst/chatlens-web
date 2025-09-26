import React from 'react';
import { Upload } from 'lucide-react';
import { WidgetConfig, ConfigUpdateFunction } from './types';
import ColorPicker from './ColorPicker';

interface LauncherSectionProps {
  config: WidgetConfig;
  setConfig: ConfigUpdateFunction;
  onFileUpload: (type: 'avatar' | 'logo' | 'banner') => void;
  brandColors: string[];
}

const LauncherSection: React.FC<LauncherSectionProps> = ({ 
  config, 
  setConfig, 
  onFileUpload, 
  brandColors 
}) => {
  return (
    <div className="space-y-6">
      {/* Position Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Launcher Position
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'bottom-right', label: 'Bottom Right' },
            { value: 'bottom-left', label: 'Bottom Left' },
            { value: 'center', label: 'Center' }
          ].map((position) => (
            <label key={position.value} className="relative">
              <input
                type="radio"
                name="position"
                value={position.value}
                checked={config.launcher.position === position.value}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  launcher: { ...prev.launcher, position: e.target.value as any }
                }))}
                className="sr-only"
              />
              <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all text-center ${
                config.launcher.position === position.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <span className="font-medium">{position.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Icon Customization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Launcher Icon
        </label>
        <div className="space-y-3">
          {[
            { value: 'default', label: 'Default ChatLens Icon' },
            { value: 'custom', label: 'Custom Icon Upload' },
            { value: 'disabled', label: 'No Icon (Text Only)' }
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="icon"
                value={option.value}
                checked={config.launcher.icon === option.value}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  launcher: { ...prev.launcher, icon: e.target.value as any }
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-3"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        
        {config.launcher.icon === 'custom' && (
          <div className="mt-3">
            <button
              onClick={() => onFileUpload('avatar')}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Custom Icon
            </button>
          </div>
        )}
      </div>

      {/* Background Color */}
      <ColorPicker
        label="Background Color"
        value={config.launcher.backgroundColor}
        onChange={(color) => setConfig(prev => ({
          ...prev,
          launcher: { ...prev.launcher, backgroundColor: color }
        }))}
        brandColors={brandColors}
      />

      {/* Size Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Launcher Size: {config.launcher.size}px
        </label>
        <input
          type="range"
          min="40"
          max="80"
          value={config.launcher.size}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            launcher: { ...prev.launcher, size: parseInt(e.target.value) }
          }))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Small (40px)</span>
          <span>Large (80px)</span>
        </div>
      </div>
    </div>
  );
};

export default LauncherSection;