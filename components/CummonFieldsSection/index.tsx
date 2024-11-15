"use client";
import { FC, ReactNode } from "react";
import { Title, Subtitle, Paragraph, SectionTitle } from "@/components/Text";
import { MdKeyboardArrowRight } from "react-icons/md";
interface SectionItem {
  title: string;
  subtitle?: string;
  duration: {
    start: string;
    end: string;
  };
  location?: string;
  details?: string[];
}

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
  const itemClasses = [
    "py-md sm:px-lg px-xs",
    styles?.border ? "border border-text-dark" : "",
    styles?.borderRadius ? "rounded-lg" : "",
    styles?.shadow ? "shadow-lg" : "",
  ].join(" ");

  return (
    <section
      className={`flex flex-col ${
        styles?.border || styles?.shadow ? "gap-4" : ""
      }`}
    >
      <SectionTitle className="flex items-center gap-sm ">
        {icon}
        {title}
      </SectionTitle>
      {styles?.underline && (
        <hr className="mt-4 border-t border-gray-300 dark:border-gray-600" />
      )}
      {items.map((item, index) => (
        <span key={index}>
          <div className={itemClasses}>
            <Title className="text-gray-800 dark:text-white">
              {item.title}
            </Title>
            {item.subtitle && (
              <Subtitle className="text-gray-800 dark:text-white">
                {item.subtitle}
              </Subtitle>
            )}
            <Paragraph className="text-gray-600 dark:text-gray-400">
              {item.duration.start} - {item.duration.end}
            </Paragraph>
            {item.location && (
              <Paragraph className="text-gray-600 dark:text-gray-400">
                {item.location}
              </Paragraph>
            )}
            {item.details && (
              <ul className="list-none mt-2 text-gray-700 dark:text-gray-300">
                {item.details.map((detail, idx) => (
                  <li className=" flex gap-xs items-start" key={idx}>
                    <MdKeyboardArrowRight className="my-1" />
                    <Paragraph> {detail}</Paragraph>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {styles?.underline && (
            <hr className="border-t border-gray-300 dark:border-gray-600" />
          )}
        </span>
      ))}
    </section>
  );
};

export default CummonFieldsSection;
