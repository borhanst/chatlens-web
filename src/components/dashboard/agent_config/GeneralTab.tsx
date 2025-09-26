import React from 'react';
import { Settings } from 'lucide-react';
import { ConfigData } from './types';
import { FormField } from '../../ui/FormField';
import { ConfigSection } from '../../ui/ConfigSection';

interface GeneralTabProps {
  config: ConfigData;
  setConfig: React.Dispatch<React.SetStateAction<ConfigData>>;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({ config, setConfig }) => (
  <ConfigSection title="General Configuration" icon={Settings}>
    <FormField 
      label="Bot Name" 
      description="This name will appear in the chat interface"
    >
      <input
        type="text"
        value={config.general.agentName}
        onChange={(e) => setConfig(prev => ({
          ...prev,
          general: { ...prev.general, agentName: e.target.value }
        }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
        placeholder="Enter bot name"
      />
    </FormField>

    <FormField 
      label="Website Domain" 
      description="The domain where your chat agent will be deployed"
    >
      <input
        type="text"
        value={config.general.websiteDomain}
        onChange={(e) => setConfig(prev => ({
          ...prev,
          general: { ...prev.general, websiteDomain: e.target.value }
        }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
        placeholder="yoursite.com"
      />
    </FormField>

    <FormField label="Chat Language">
      <select
        value={config.general.language}
        onChange={(e) => setConfig(prev => ({
          ...prev,
          general: { ...prev.general, language: e.target.value }
        }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
      >
        <option value="en">🇺🇸 English</option>
        <option value="es">🇪🇸 Spanish</option>
        <option value="fr">🇫🇷 French</option>
        <option value="de">🇩🇪 German</option>
        <option value="it">🇮🇹 Italian</option>
        <option value="pt">🇵🇹 Portuguese</option>
      </select>
    </FormField>
  </ConfigSection>
);