import { FC } from "react";
import { FaBriefcase } from "react-icons/fa";
import { Experience } from "@/types/resume";
import CummonFieldsSection from "@/components/CummonFieldsSection";

interface ExperienceSectionProps {
  experiences: Experience[];
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
}) => (
  <CummonFieldsSection
    title="Experience"
    icon={<FaBriefcase />}
    items={experiences.map((exp) => ({
      title: exp.title,
      subtitle: exp.organization,
      duration: exp.duration,
      location: exp.location,
      details: exp.details,
    }))}
    styles={styles}
  />
);

export default ExperienceSection;
