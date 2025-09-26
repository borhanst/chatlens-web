import React, { useState } from 'react';
import { Code, Eye, EyeOff } from 'lucide-react';
import { ConfigData } from './types';
import { FormField } from '../../ui/FormField';
import { ConfigSection } from '../../ui/ConfigSection';

interface AdvancedTabProps {
  config: ConfigData;
  setConfig: React.Dispatch<React.SetStateAction<ConfigData>>;
}

const llmModels = [
  { value: 'gpt-4', label: 'GPT-4', description: 'Most capable, best for complex tasks' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Fast and efficient for most use cases' },
  { value: 'claude-3', label: 'Claude 3', description: 'Great for detailed analysis and writing' },
  { value: 'gemini-pro', label: 'Gemini Pro', description: 'Google\'s advanced language model' }
];

export const AdvancedTab: React.FC<AdvancedTabProps> = ({ config, setConfig }) => {
  const [showWebhookUrl, setShowWebhookUrl] = useState(false);

  return (
    <ConfigSection title="Advanced Technical Settings" icon={Code} iconColor="text-red-600">
      <FormField label="LLM Model">
        <div className="space-y-2">
          {llmModels.map((model) => (
            <label key={model.value} className="relative">
              <input
                type="radio"
                name="llmModel"
                value={model.value}
                checked={config.advanced.llmModel === model.value}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  advanced: { ...prev.advanced, llmModel: e.target.value }
                }))}
                className="sr-only"
              />
              <div className={`p-3 border rounded-lg cursor-pointer transition-all ${
                config.advanced.llmModel === model.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-inter font-medium text-gray-900">{model.label}</h4>
                    <p className="text-sm text-gray-600">{model.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    config.advanced.llmModel === model.value
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {config.advanced.llmModel === model.value && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Embedding Model">
        <select
          value={config.advanced.embeddingModel}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            advanced: { ...prev.advanced, embeddingModel: e.target.value }
          }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
        >
          <option value="text-embedding-ada-002">OpenAI Ada v2</option>
          <option value="text-embedding-3-small">OpenAI v3 Small</option>
          <option value="text-embedding-3-large">OpenAI v3 Large</option>
        </select>
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Max Tokens">
          <input
            type="number"
            value={config.advanced.maxTokens}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              advanced: { ...prev.advanced, maxTokens: parseInt(e.target.value) }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
            min="100"
            max="4096"
          />
        </FormField>

        <FormField label="Max Message Length">
          <input
            type="number"
            value={config.advanced.maxMessageLength}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              advanced: { ...prev.advanced, maxMessageLength: parseInt(e.target.value) }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
            min="50"
            max="1000"
          />
        </FormField>
      </div>

      <FormField 
        label={
          <div className="flex items-center">
            Webhook URL
            <span className="text-xs text-gray-500 ml-2">(Optional)</span>
          </div>
        }
        description="Receive notifications when users interact with your bot"
      >
        <div className="relative">
          <input
            type={showWebhookUrl ? 'text' : 'password'}
            value={config.advanced.webhookUrl}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              advanced: { ...prev.advanced, webhookUrl: e.target.value }
            }))}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
            placeholder="https://your-webhook-url.com"
          />
          <button
            type="button"
            onClick={() => setShowWebhookUrl(!showWebhookUrl)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showWebhookUrl ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        </div>
      </FormField>
    </ConfigSection>
  );
};