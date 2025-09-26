import React from 'react';

interface ConfigSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  children: React.ReactNode;
}

export const ConfigSection: React.FC<ConfigSectionProps> = ({ 
  title, 
  icon: Icon, 
  iconColor = 'text-blue-600',
  children 
}) => (
  <div className="space-y-8">
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-6 flex items-center">
        <Icon className={`w-6 h-6 mr-3 ${iconColor}`} />
        {title}
      </h3>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  </div>
);