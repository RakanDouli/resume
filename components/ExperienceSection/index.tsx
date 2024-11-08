import { FC } from "react";
import { FaBriefcase } from "react-icons/fa";
import { Experience } from "@/types/resume";

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: FC<ExperienceSectionProps> = ({ experiences }) => (
  <section>
    <h2 className="text-2xl font-semibold flex items-center gap-4 text-gray-800 dark:text-white">
      <FaBriefcase />
      <span>Experience</span>
    </h2>
    {experiences.map((item, index) => (
      <div
        key={index}
        className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow"
      >
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {item.role} at {item.company}
        </h3>
        {item.location && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {item.location}
          </p>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {item.duration.start} - {item.duration.end}
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-700 dark:text-gray-300">
          {item.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      </div>
    ))}
  </section>
);

export default ExperienceSection;
