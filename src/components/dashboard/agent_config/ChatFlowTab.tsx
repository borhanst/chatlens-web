import React from 'react';
import { MessageSquare, Plus, X } from 'lucide-react';
import { ConfigData } from './types';
import { FormField } from '../../ui/FormField';
import { ConfigSection } from '../../ui/ConfigSection';

interface ChatFlowTabProps {
  config: ConfigData;
  setConfig: React.Dispatch<React.SetStateAction<ConfigData>>;
}

export const ChatFlowTab: React.FC<ChatFlowTabProps> = ({ config, setConfig }) => {
  const addFollowUpPrompt = () => {
    setConfig(prev => ({
      ...prev,
      chatFlow: {
        ...prev.chatFlow,
        followUpPrompts: [...prev.chatFlow.followUpPrompts, '']
      }
    }));
  };

  const removeFollowUpPrompt = (index: number) => {
    setConfig(prev => ({
      ...prev,
      chatFlow: {
        ...prev.chatFlow,
        followUpPrompts: prev.chatFlow.followUpPrompts.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <ConfigSection title="Chat Flow & Conversation Design" icon={MessageSquare}>
      <FormField 
        label="Welcome Message" 
        description="First message users see when they open the chat"
      >
        <input
          type="text"
          value={config.chatFlow.welcomeMessage}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            chatFlow: { ...prev.chatFlow, welcomeMessage: e.target.value }
          }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
          placeholder="Hi! 👋 How can I help you today?"
        />
      </FormField>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-inter font-medium text-gray-700">
            Follow-up Prompts
          </label>
          <button
            onClick={addFollowUpPrompt}
            className="flex items-center px-3 py-1 text-sm font-inter font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {config.chatFlow.followUpPrompts.map((prompt, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => {
                  const newPrompts = [...config.chatFlow.followUpPrompts];
                  newPrompts[index] = e.target.value;
                  setConfig(prev => ({
                    ...prev,
                    chatFlow: { ...prev.chatFlow, followUpPrompts: newPrompts }
                  }));
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter text-sm transition-colors"
                placeholder="Enter follow-up prompt"
              />
              <button
                onClick={() => removeFollowUpPrompt(index)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">Quick action buttons shown to users</p>
      </div>

      <FormField label="Auto-Reply Timeout">
        <select
          value={config.chatFlow.autoReplyTimeout}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            chatFlow: { ...prev.chatFlow, autoReplyTimeout: e.target.value }
          }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
        >
          <option value="3s">3 seconds</option>
          <option value="5s">5 seconds</option>
          <option value="10s">10 seconds</option>
          <option value="15s">15 seconds</option>
        </select>
      </FormField>

      <FormField 
        label="Fallback Message" 
        description="Shown when the bot can't understand or help with a query"
      >
        <textarea
          value={config.chatFlow.fallbackMessage}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            chatFlow: { ...prev.chatFlow, fallbackMessage: e.target.value }
          }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
          placeholder="Message when bot can't help"
        />
      </FormField>
    </ConfigSection>
  );
};