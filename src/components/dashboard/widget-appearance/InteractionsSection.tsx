import React from 'react';
import { WidgetConfig, ConfigUpdateFunction } from './types';

interface InteractionsSectionProps {
  config: WidgetConfig;
  setConfig: ConfigUpdateFunction;
}

const InteractionsSection: React.FC<InteractionsSectionProps> = ({ config, setConfig }) => {
  return (
    <div className="space-y-6">
      {/* Initial State */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Initial State
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'minimized', label: 'Minimized', description: 'Show only launcher button' },
            { value: 'open', label: 'Open', description: 'Show full chat window' }
          ].map((option) => (
            <label key={option.value} className="relative">
              <input
                type="radio"
                name="initialState"
                value={option.value}
                checked={config.interactions.initialState === option.value}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  interactions: { ...prev.interactions, initialState: e.target.value as any }
                }))}
                className="sr-only"
              />
              <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                config.interactions.initialState === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-gray-500 mt-1">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Animation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Animation Style
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'slide', label: 'Slide', description: 'Slide up from bottom' },
            { value: 'pop', label: 'Pop', description: 'Scale in with bounce' },
            { value: 'fade', label: 'Fade', description: 'Fade in smoothly' }
          ].map((option) => (
            <label key={option.value} className="relative">
              <input
                type="radio"
                name="animation"
                value={option.value}
                checked={config.interactions.animation === option.value}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  interactions: { ...prev.interactions, animation: e.target.value as any }
                }))}
                className="sr-only"
              />
              <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all text-center ${
                config.interactions.animation === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-gray-500 mt-1">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Trigger Timing */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Trigger Timing
        </label>
        <div className="space-y-3">
          {[
            { value: 'immediate', label: 'Immediate', description: 'Show widget as soon as page loads' },
            { value: '3s', label: 'After 3 seconds', description: 'Delay widget appearance by 3 seconds' },
            { value: '10s', label: 'After 10 seconds', description: 'Delay widget appearance by 10 seconds' },
            { value: 'scroll', label: 'On scroll', description: 'Show when user scrolls down the page' }
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="triggerTiming"
                value={option.value}
                checked={config.interactions.triggerTiming === option.value}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  interactions: { ...prev.interactions, triggerTiming: e.target.value as any }
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </div>
            </label>
          ))}
        </div>

        {config.interactions.triggerTiming === 'scroll' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scroll Percentage: {config.interactions.scrollPercentage}%
            </label>
            <input
              type="range"
              min="10"
              max="90"
              value={config.interactions.scrollPercentage}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                interactions: { ...prev.interactions, scrollPercentage: parseInt(e.target.value) }
              }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10%</span>
              <span>90%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionsSection;