"use client";
import { FC, ReactNode } from "react";
import { Title, Subtitle, Paragraph, SectionTitle } from "@/components/Text";
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
    "py-sm sm:px-md px-xs",
    styles?.border ? "border border-text-dark" : "",
    styles?.borderRadius ? "rounded-lg" : "",
    styles?.shadow ? "shadow-lg" : "",
  ].join(" ");

  return (
    <section
      className={`flex flex-col ${
        styles?.border || styles?.shadow ? "gap-sm" : ""
      }`}
    >
      {/* Section Title */}
      <SectionTitle className="flex items-center gap-sm ">
        {icon}
        {title}
      </SectionTitle>

      {/* Underline if style requested */}
      {styles?.underline && (
        <hr className="mt-4 border-t border-gray-300 dark:border-gray-600" />
      )}

      {/* Map over items and display content */}
      {items?.map((item, index) => (
        <div key={index}>
          <div className={itemClasses}>
            {/* Title of the item */}
            <Title className="text-gray-800 dark:text-white">
              {item.title} {item.organization ? `- ${item.organization}` : null}
            </Title>

            {/* Optional Subtitle */}
            {item.subtitle && (
              <Subtitle className="text-gray-800 dark:text-white">
                {item.subtitle}
              </Subtitle>
            )}

            {/* Display Duration */}
            <Paragraph className="text-gray-600 dark:text-gray-400">
              {item.duration.start} - {item.duration.end}
            </Paragraph>

            {/* Optional Location */}
            {item.location && (
              <Paragraph className="text-gray-600 dark:text-gray-400">
                {item.location}
              </Paragraph>
            )}

            {/* Details as list */}
            {item.details && (
              <ul className="list-none mt-2 text-gray-700 dark:text-gray-300">
                {item.details.map((detail, idx) => (
                  <li className="flex gap-xs items-start" key={idx}>
                    <GoDotFill className="my-1" />
                    <Paragraph>{detail}</Paragraph>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Underline after each item if style requested */}
          {styles?.underline && (
            <hr className="border-t border-gray-300 dark:border-gray-600" />
          )}
        </div>
      ))}
    </section>
  );
};

export default CummonFieldsSection;
