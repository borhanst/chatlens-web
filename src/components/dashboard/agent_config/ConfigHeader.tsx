import React from 'react';
import { Play, Save } from 'lucide-react';

interface ConfigHeaderProps {
  isSaving: boolean;
  handleSave: () => void;
  setShowPreview: (show: boolean) => void;
}

export const ConfigHeader: React.FC<ConfigHeaderProps> = ({ 
  isSaving, 
  handleSave, 
  setShowPreview 
}) => (
  <div className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-poppins font-bold text-gray-900">Agent Configuration</h1>
        <p className="text-gray-600 font-inter mt-1">Customize your ChatLens assistant</p>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-inter font-medium transition-colors"
        >
          <Play className="w-4 h-4 mr-2" />
          Test Agent
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-inter font-medium transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  </div>
);