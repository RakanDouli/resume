import React, { ReactNode } from "react";

// SectionTitle component
interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h1 className={`text-clamp-2xl font-bold pb-xs leading-snug ${className}`}>
      {children}
    </h1>
  );
};

// Title component
interface TitleProps {
  children: ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <h2 className={`text-clamp-xl font-bold pb-xs leading-snug ${className}`}>
      {children}
    </h2>
  );
};

// Subtitle component
interface SubtitleProps {
  children: ReactNode;
  className?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ children, className }) => {
  return (
    <h3
      className={`text-clamp-md font-semibold pb-xs leading-normal ${className}`}
    >
      {children}
    </h3>
  );
};

// Paragraph component
interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  return (
    <p className={`text-clamp-sm font-normal pb-xs leading-snug ${className}`}>
      {children}
    </p>
  );
};

// Export all components from one file
export { SectionTitle, Title, Subtitle, Paragraph };
