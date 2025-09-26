import React from 'react';
import { Workflow, Plus, X } from 'lucide-react';
import { ConfigData } from './types';
import { Toggle } from '../../ui/Toggle';
import { ConfigSection } from '../../ui/ConfigSection';

interface BehaviorTabProps {
  config: ConfigData;
  setConfig: React.Dispatch<React.SetStateAction<ConfigData>>;
}

export const BehaviorTab: React.FC<BehaviorTabProps> = ({ config, setConfig }) => {
  const addCustomRule = () => {
    const newRule = {
      id: Date.now().toString(),
      condition: '',
      action: ''
    };
    setConfig(prev => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        customRules: [...prev.behavior.customRules, newRule]
      }
    }));
  };

  const removeCustomRule = (id: string) => {
    setConfig(prev => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        customRules: prev.behavior.customRules.filter(rule => rule.id !== id)
      }
    }));
  };

  return (
    <ConfigSection title="Behavior Rules & Automation" icon={Workflow} iconColor="text-green-600">
      <div>
        <h4 className="text-lg font-poppins font-semibold text-gray-900 mb-4">Predefined Behaviors</h4>
        <div className="space-y-4">
          <Toggle
            checked={config.behavior.autoFAQ}
            onChange={(checked) => setConfig(prev => ({
              ...prev,
              behavior: { ...prev.behavior, autoFAQ: checked }
            }))}
            label="Auto-respond to FAQs"
            description="Automatically answer frequently asked questions"
          />

          <Toggle
            checked={config.behavior.bookMeetings}
            onChange={(checked) => setConfig(prev => ({
              ...prev,
              behavior: { ...prev.behavior, bookMeetings: checked }
            }))}
            label="Offer to book meetings"
            description="Suggest scheduling when appropriate"
          />

          <Toggle
            checked={config.behavior.redirectToHuman}
            onChange={(checked) => setConfig(prev => ({
              ...prev,
              behavior: { ...prev.behavior, redirectToHuman: checked }
            }))}
            label="Redirect to human if stuck"
            description="Transfer complex queries to human support"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-poppins font-semibold text-gray-900">Custom Rules</h4>
          <button
            onClick={addCustomRule}
            className="flex items-center px-3 py-2 text-sm font-inter font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Rule
          </button>
        </div>
        
        <div className="space-y-3">
          {config.behavior.customRules.map((rule, index) => (
            <div key={rule.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="If user asks about..."
                  value={rule.condition}
                  onChange={(e) => {
                    const newRules = [...config.behavior.customRules];
                    newRules[index].condition = e.target.value;
                    setConfig(prev => ({
                      ...prev,
                      behavior: { ...prev.behavior, customRules: newRules }
                    }));
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter text-sm transition-colors"
                />
                <input
                  type="text"
                  placeholder="Then do..."
                  value={rule.action}
                  onChange={(e) => {
                    const newRules = [...config.behavior.customRules];
                    newRules[index].action = e.target.value;
                    setConfig(prev => ({
                      ...prev,
                      behavior: { ...prev.behavior, customRules: newRules }
                    }));
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter text-sm transition-colors"
                />
              </div>
              <button
                onClick={() => removeCustomRule(rule.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {config.behavior.customRules.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="font-inter">No custom rules defined yet.</p>
              <p className="text-sm mt-1">Add rules to customize your bot's behavior for specific scenarios.</p>
            </div>
          )}
        </div>
      </div>
    </ConfigSection>
  );
};