import React from 'react';

interface FormFieldProps {
  label: React.ReactNode | string;
  children: React.ReactNode;
  description?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  children, 
  description, 
  required 
}) => (
  <div>
    <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {description && (
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    )}
  </div>
);