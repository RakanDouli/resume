"use client";
import { FC, ReactNode } from "react";
import { Title, Paragraph, SectionTitle } from "@/components/Text";
import { SectionItem } from "@/types/resume";
import { GoDotFill } from "react-icons/go";

interface SectionProps {
  title: string;
  icon: ReactNode;
  items: SectionItem[];
  styles?: {
    underline?: boolean;
    border?: boolean;
    borderRadius?: boolean;
    shadow?: boolean;
  };
}

const CummonFieldsSection: FC<SectionProps> = ({
  title,
  icon,
  items,
  styles,
}) => {
  // Build dynamic classes based on styles
  const itemClasses = [
    "py-xs px-xs",
    styles?.border ? "border border-dark/30" : "",
    styles?.borderRadius ? "rounded-lg" : "",
    styles?.shadow ? "shadow-lg" : "",
  ].join(" ");

  return (
    <section
      className={`flex flex-col gap-sm ${
        styles?.border || styles?.shadow ? "gap-xs" : ""
      }`}
    >
      {/* Section Title */}
      <SectionTitle className="flex items-center gap-sm mb-xs">
        {icon}
        {title}
      </SectionTitle>

      {/* Underline if style requested */}
      {styles?.underline && (
        <hr className="border-t border-dark/20 mb-xs" />
      )}

      {/* Map over items and display content */}
      {items?.map((item, index) => (
        <div key={index} className="mb-sm">
          <div className={itemClasses}>
            {/* Title and Duration on same line for compactness */}
            <div className="flex justify-between items-baseline flex-wrap gap-sm">
              <Title className="text-dark">
                {item.title}{item.organization ? ` - ${item.organization}` : null}
              </Title>
              <Paragraph className="text-dark/70 whitespace-nowrap">
                {item.duration.start} - {item.duration.end}
              </Paragraph>
            </div>

            {/* Location */}
            {item.location && (
              <Paragraph className="text-dark/70 mt-xs">
                {item.location}
              </Paragraph>
            )}

            {/* Details as list */}
            {item.details && (
              <ul className="list-none mt-sm text-dark">
                {item.details.map((detail, idx) => (
                  <li className="flex gap-xs items-start mb-xs" key={idx}>
                    <GoDotFill className="mt-1 flex-shrink-0 text-xs" />
                    <Paragraph>{detail}</Paragraph>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Underline after each item if style requested */}
          {styles?.underline && (
            <hr className="border-t border-dark/20 mt-sm" />
          )}
        </div>
      ))}
    </section>
  );
};

export default CummonFieldsSection;
