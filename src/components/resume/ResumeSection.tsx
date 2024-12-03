import React from 'react';

interface ResumeSectionProps {
  title: string;
  content: React.ReactNode;
  order: number;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({
  title,
  content,
  order,
}) => {
  return (
    <section style={{ order }}>
      <h2>{title}</h2>
      <div>{content}</div>
    </section>
  );
};

export default ResumeSection;
