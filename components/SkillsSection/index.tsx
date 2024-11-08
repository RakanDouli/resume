// SkillsSection.tsx
import { FC } from "react";
import { Skills } from "@/types/resume";
import { FaTools } from "react-icons/fa";

interface SkillsSectionProps {
  skills: Skills;
}

const SkillsSection: FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold flex items-center gap-4 text-gray-800 dark:text-white">
        <FaTools />
        Skills
      </h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {skills.technical.map((skill, idx) => (
          <span
            key={idx}
            className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {skills.other.map((skill, idx) => (
          <span
            key={idx}
            className="px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-all"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
