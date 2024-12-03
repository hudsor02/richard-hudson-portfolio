import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
