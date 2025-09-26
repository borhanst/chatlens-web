import React from 'react';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  id,
  label,
  description,
  icon: Icon,
  isActive,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-gray-900">{label}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      {isActive ? (
        <ChevronDown className="w-5 h-5 text-gray-400" />
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
};

export default SectionHeader;