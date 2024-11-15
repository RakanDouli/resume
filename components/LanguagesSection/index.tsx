"use client";
import { FC } from "react";
import { Language } from "@/types/resume";
import { Paragraph, SectionTitle, Subtitle } from "../Text";
import { GrLanguage } from "react-icons/gr";
import { GoStarFill } from "react-icons/go";
interface LanguagesSectionProps {
  languages: Language[];
  styles: {
    rate?: boolean;
    border?: boolean;
    borderRadius?: boolean;
    shadow?: boolean;
  };
}

// Mapping the language level strings to numerical values (adjust as necessary)
const levelMap: { [key: string]: number } = {
  Native: 5,
  Advanced: 4,
  Intermediate: 3,
  Beginner: 2,
  Basic: 1,
};

const LanguagesSection: FC<LanguagesSectionProps> = ({ languages, styles }) => {
  const itemClasses = [
    styles?.border ? "border border-text-dark" : "",
    styles?.borderRadius ? "rounded-lg" : "",
    styles?.shadow ? "shadow-lg" : "",
    "px-md py-sm flex items-center gap-sm w-max",
  ].join(" ");
  return (
    <section className="languages-section flex flex-col gap-md ">
      <SectionTitle className="flex items-center gap-sm ">
        <GrLanguage />
        Languages
      </SectionTitle>
      <ul className="list-none flex flex items-center gap-sm flex-wrap">
        {languages.map((lang) => {
          const level = levelMap[lang.level] || 0;
          return (
            <li key={lang.language} className={itemClasses}>
              <span className="mb-xs">
                <Subtitle>{lang.language}</Subtitle>
              </span>

              {styles.rate ? (
                <div className="flex items-center gap-xs">
                  {Array.from({ length: level }).map((_, index) => (
                    <span key={index} className="text-dark">
                      <GoStarFill />
                    </span>
                  ))}
                  {Array.from({ length: 5 - level }).map((_, index) => (
                    <span key={index} className="text-lightgray">
                      <GoStarFill />
                    </span>
                  ))}
                </div>
              ) : (
                <Paragraph>( {lang.level} )</Paragraph>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default LanguagesSection;
