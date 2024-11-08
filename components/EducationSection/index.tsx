// EducationSection.tsx
import { FC } from "react";
import { Education } from "@/types/resume";
import { FaGraduationCap } from "react-icons/fa";
interface EducationSectionProps {
  education: Education[];
}

const EducationSection: FC<EducationSectionProps> = ({ education }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold flex items-center gap-4 text-gray-800 dark:text-white">
        <FaGraduationCap />
        Education
      </h2>
      {education.map((edu, index) => (
        <div
          key={index}
          className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {edu.degree || edu.program}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {edu.institution} ({edu.duration.start} - {edu.duration.end})
          </p>
          {edu.location && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {edu.location}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default EducationSection;
