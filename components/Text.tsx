import React, { ReactNode } from "react";

// SectionTitle component
interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h1 className={`text-clamp-2xl font-bold leading-snug ${className}`}>
      {children}
    </h1>
  );
};

const Title: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h2 className={`text-clamp-xl font-bold leading-snug ${className}`}>
      {children}
    </h2>
  );
};

const Subtitle: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h3 className={`text-clamp-md font-semibold leading-normal ${className}`}>
      {children}
    </h3>
  );
};

const Paragraph: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <p className={`text-clamp-sm font-normal leading-snug ${className}`}>
      {children}
    </p>
  );
};

const TinyText: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <p className={`text-clamp-xs font-normal leading-snug ${className}`}>
      {children}
    </p>
  );
};

// Export all components from one file
export { SectionTitle, Title, Subtitle, Paragraph, TinyText };
