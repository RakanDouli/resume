import { FC } from "react";
import { FaBriefcase } from "react-icons/fa";
import { Experience } from "@/types/resume";
import CummonFieldsSection from "@/components/CummonFieldsSection";

interface ExperienceSectionProps {
  experiences: Experience; // Updated to expect a single Experience object
  styles?: {
    underline?: boolean;
    border?: boolean;
    borderRadius?: boolean;
    shadow?: boolean;
  };
}

const ExperienceSection: FC<ExperienceSectionProps> = ({
  experiences,
  styles,
}) => {
  console.log(experiences);
  return (
    <CummonFieldsSection
      title={experiences?.fieldTitle}
      icon={<FaBriefcase />}
      items={experiences?.items.map((exp) => ({
        title: exp.title,
        subtitle: exp.subtitle,
        duration: exp.duration,
        location: exp.location,
        details: exp.details,
      }))}
      styles={styles}
    />
  );
};

export default ExperienceSection;
