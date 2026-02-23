"use client";
import { FC } from "react";
import { Languages } from "@/types/resume"; // Import updated type
import { Paragraph, SectionTitle, Subtitle } from "../Text";
import { GrLanguage } from "react-icons/gr";
import { GoStarFill } from "react-icons/go";

interface LanguagesSectionProps {
  languages: Languages; // Updated type
  styles: {
    rate?: boolean;
    border?: boolean;
    borderRadius?: boolean;
    shadow?: boolean;
  };
}

// Mapping the language level strings to numerical values
const levelMap: { [key: string]: number } = {
  Native: 5,
  Advanced: 4,
  Intermediate: 3,
  Beginner: 2,
  Basic: 1,
};

const LanguagesSection: FC<LanguagesSectionProps> = ({ languages, styles }) => {
  const itemClasses = [
    styles?.border ? "border border-dark" : "bg-primary/10",
    styles?.borderRadius ? "rounded-lg" : "",
    styles?.shadow ? "shadow-lg" : "",
    "px-md py-sm flex items-center gap-sm w-max",
  ].join(" ");

  return (
    <section className="languages-section flex flex-col gap-sm text-dark">
      <SectionTitle className="flex items-center gap-sm text-dark">
        <GrLanguage />
        {languages.fieldTitle}
      </SectionTitle>
      <ul className="list-none flex items-center gap-xs flex-wrap">
        {languages.list.map((lang) => {
          const level = levelMap[lang.level] ?? 0;

          return (
            <li key={lang.language} className={itemClasses}>
              <span>
                <Subtitle className="text-dark">{lang.language}</Subtitle>
              </span>

              {styles.rate ? (
                <div className="flex items-center gap-xs">
                  {Array.from({ length: level }).map((_, index) => (
                    <span key={index} className="text-secondary">
                      <GoStarFill />
                    </span>
                  ))}
                  {Array.from({ length: 5 - level }).map((_, index) => (
                    <span key={index} className="text-dark/20">
                      <GoStarFill />
                    </span>
                  ))}
                </div>
              ) : (
                <Paragraph className="text-dark/70">({lang.level})</Paragraph>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default LanguagesSection;
