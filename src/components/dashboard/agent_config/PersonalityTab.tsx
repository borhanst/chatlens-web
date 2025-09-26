import React from 'react';
import { Brain, Info } from 'lucide-react';
import { ConfigData } from './types';
import { FormField } from '../../ui/FormField';
import { ConfigSection } from '../../ui/ConfigSection';

interface PersonalityTabProps {
  config: ConfigData;
  setConfig: React.Dispatch<React.SetStateAction<ConfigData>>;
}

const personalityStyles = [
  { value: 'friendly', label: 'Friendly', description: 'Warm, approachable, and conversational' },
  { value: 'professional', label: 'Professional', description: 'Formal, business-focused, and direct' },
  { value: 'witty', label: 'Witty', description: 'Clever, humorous, and engaging' },
  { value: 'custom', label: 'Custom', description: 'Define your own personality style' }
];

export const PersonalityTab: React.FC<PersonalityTabProps> = ({ config, setConfig }) => (
  <ConfigSection title="AI Personality & Tone" icon={Brain} iconColor="text-purple-600">
    <FormField label="Personality Style">
      <div className="grid grid-cols-1 gap-3">
        {personalityStyles.map((style) => (
          <label key={style.value} className="relative">
            <input
              type="radio"
              name="personalityStyle"
              value={style.value}
              checked={config.personality.style === style.value}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                personality: { ...prev.personality, style: e.target.value }
              }))}
              className="sr-only"
            />
            <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
              config.personality.style === style.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-inter font-semibold text-gray-900">{style.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  config.personality.style === style.value
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {config.personality.style === style.value && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </FormField>

    {config.personality.style === 'custom' && (
      <FormField label="Custom Style Description">
        <textarea
          value={config.personality.customStyle}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            personality: { ...prev.personality, customStyle: e.target.value }
          }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
          placeholder="Describe your custom personality style..."
        />
      </FormField>
    )}

    <FormField 
      label={`Temperature: ${config.personality.temperature}`}
      description={`${config.personality.temperature < 0.3 ? 'Conservative' : 
        config.personality.temperature < 0.7 ? 'Balanced' : 'Creative'}`}
    >
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={config.personality.temperature}
        onChange={(e) => setConfig(prev => ({
          ...prev,
          personality: { ...prev.personality, temperature: parseFloat(e.target.value) }
        }))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>More Focused</span>
        <span>More Creative</span>
      </div>
    </FormField>

    <FormField 
      label={
        <div className="flex items-center">
          System Prompt
          <button className="ml-2 text-gray-400 hover:text-gray-600">
            <Info className="w-4 h-4" />
          </button>
        </div>
      }
      description="This prompt defines your agent's core behavior and personality"
    >
      <textarea
        value={config.personality.systemPrompt}
        onChange={(e) => setConfig(prev => ({
          ...prev,
          personality: { ...prev.personality, systemPrompt: e.target.value }
        }))}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
        placeholder="Define how your agent should behave..."
      />
    </FormField>
  </ConfigSection>
);