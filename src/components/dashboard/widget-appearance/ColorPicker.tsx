import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  brandColors?: string[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, brandColors }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#3B82F6"
          />
        </div>
        
        {brandColors && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Brand Colors</p>
            <div className="flex flex-wrap gap-2">
              {brandColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => onChange(color)}
                  className="w-8 h-8 rounded-lg border-2 border-white shadow-sm hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;