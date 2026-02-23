// SkillsSection.tsx
import { FC } from "react";
import { Skills } from "@/types/resume";
import { FaTools } from "react-icons/fa";
import { Paragraph, SectionTitle } from "../Text";

interface SkillsSectionProps {
  skills: Skills;
  styles?: {
    border?: boolean;
    borderRadius?: boolean;
    shadow?: boolean;
  };
}

const SkillsSection: FC<SkillsSectionProps> = ({ skills, styles }) => {
  const itemClasses = [
    styles?.border ? "border border-dark" : "bg-primary/10",
    styles?.borderRadius ? "rounded-lg" : "",
    styles?.shadow ? "shadow-lg" : "",
    "px-md py-sm",
  ].join(" ");
  return (
    <section className="flex flex-col gap-sm text-dark">
      <SectionTitle className="flex items-center gap-sm text-dark">
        <FaTools />
        {skills.fieldTitle || "Skills"}
      </SectionTitle>

      <div className="flex flex-wrap gap-xs">
        {skills.technical.map((skill, idx) => (
          <span
            key={idx}
            className={itemClasses}
            style={{
              boxShadow: styles?.shadow ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "",
            }}
          >
            <Paragraph className="text-dark">{skill}</Paragraph>
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-xs">
        {skills.other.map((skill, idx) => (
          <span
            key={idx}
            className={itemClasses}
            style={{
              boxShadow: styles?.shadow ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "",
            }}
          >
            <Paragraph className="text-dark">{skill}</Paragraph>
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
