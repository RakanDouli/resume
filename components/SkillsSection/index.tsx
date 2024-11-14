// SkillsSection.tsx
import { FC } from "react";
import { Skills } from "@/types/resume";
import { FaTools } from "react-icons/fa";
import { Paragraph, SectionTitle, Title } from "../Text";

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
    styles?.border ? "border border-text-dark" : "",
    styles?.borderRadius ? "rounded-lg" : "",
    styles?.shadow ? "shadow-lg" : "",
    "px-md py-sm",
  ].join(" ");
  return (
    <section className=" flex flex-col gap-sm">
      <SectionTitle className="flex items-center gap-sm ">
        <FaTools />
        Skills
      </SectionTitle>

      <div className="flex flex-wrap gap-sm">
        {skills.technical.map((skill, idx) => (
          <span key={idx} className={itemClasses}>
            <Paragraph>{skill}</Paragraph>
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-sm">
        {skills.other.map((skill, idx) => (
          <span key={idx} className={itemClasses}>
            <Paragraph>{skill}</Paragraph>
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
