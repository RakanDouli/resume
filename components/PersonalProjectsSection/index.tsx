import { FC } from "react";
import { FaLightbulb } from "react-icons/fa";
import { PersonalProjects } from "@/types/resume";
import CummonFieldsSection from "@/components/CummonFieldsSection";

interface PersonalProjectsSectionProps {
  personalProjects: PersonalProjects;
  styles?: {
    underline?: boolean;
    border?: boolean;
    borderRadius?: boolean;
    shadow?: boolean;
  };
}

const PersonalProjectsSection: FC<PersonalProjectsSectionProps> = ({
  personalProjects,
  styles,
}) => {
  return (
    <CummonFieldsSection
      title={personalProjects?.fieldTitle}
      icon={<FaLightbulb />}
      items={personalProjects?.items.map((project) => ({
        title: project.title,
        organization: project.organization,
        subtitle: project.subtitle,
        duration: project.duration,
        location: project.location,
        details: project.details,
      }))}
      styles={styles}
    />
  );
};

export default PersonalProjectsSection;
