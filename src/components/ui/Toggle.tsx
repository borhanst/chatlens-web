import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ 
  checked, 
  onChange, 
  label, 
  description 
}) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
    <div>
      <h5 className="font-inter font-medium text-gray-900">{label}</h5>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={`w-11 h-6 rounded-full transition-colors ${
        checked ? 'bg-primary-500' : 'bg-gray-300'
      }`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        } mt-0.5`}></div>
      </div>
    </label>
  </div>
);