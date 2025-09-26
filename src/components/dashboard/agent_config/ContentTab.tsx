import React from 'react';
import { Database } from 'lucide-react';
import { ConfigData } from './types';
import { FormField } from '../../ui/FormField';
import { Toggle } from '../../ui/Toggle';
import { ConfigSection } from '../../ui/ConfigSection';

interface ContentTabProps {
  config: ConfigData;
  setConfig: React.Dispatch<React.SetStateAction<ConfigData>>;
}

const categories = ['/docs', '/blog', '/products', '/support', '/about', '/pricing'];

export const ContentTab: React.FC<ContentTabProps> = ({ config, setConfig }) => (
  <ConfigSection title="Content Access Control" icon={Database} iconColor="text-orange-600">
    <Toggle
      checked={config.content.limitByCategory}
      onChange={(checked) => setConfig(prev => ({
        ...prev,
        content: { ...prev.content, limitByCategory: checked }
      }))}
      label="Limit by page category"
      description="Only crawl specific sections of your website"
    />

    {config.content.limitByCategory && (
      <FormField label="Allowed Categories">
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={config.content.allowedCategories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setConfig(prev => ({
                      ...prev,
                      content: {
                        ...prev.content,
                        allowedCategories: [...prev.content.allowedCategories, category]
                      }
                    }));
                  } else {
                    setConfig(prev => ({
                      ...prev,
                      content: {
                        ...prev.content,
                        allowedCategories: prev.content.allowedCategories.filter(c => c !== category)
                      }
                    }));
                  }
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-2"
              />
              <span className="text-sm font-inter text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </FormField>
    )}

    <FormField 
      label="Excluded Keywords" 
      description="Separate keywords with commas"
    >
      <input
        type="text"
        value={config.content.excludedKeywords.join(', ')}
        onChange={(e) => setConfig(prev => ({
          ...prev,
          content: {
            ...prev.content,
            excludedKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
          }
        }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
        placeholder="admin, login, checkout"
      />
    </FormField>

    <FormField 
      label="Excluded Paths" 
      description="Separate paths with commas"
    >
      <input
        type="text"
        value={config.content.excludedPaths.join(', ')}
        onChange={(e) => setConfig(prev => ({
          ...prev,
          content: {
            ...prev.content,
            excludedPaths: e.target.value.split(',').map(p => p.trim()).filter(p => p)
          }
        }))}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-inter transition-colors"
        placeholder="/admin, /login, /checkout"
      />
    </FormField>
  </ConfigSection>
);