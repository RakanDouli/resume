import { FC } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { Education } from "@/types/resume";
import CummonFieldsSection from "@/components/CummonFieldsSection";

interface EducationSectionProps {
  education: Education;
  styles?: {
    underline?: boolean;
    border?: boolean;
    borderRadius?: boolean;
    shadow?: boolean;
  };
}

const EducationSection: FC<EducationSectionProps> = ({ education, styles }) => (
  <CummonFieldsSection
    title={education?.fieldTitle}
    icon={<FaGraduationCap />}
    items={education?.items.map((edu) => ({
      title: edu.title,
      subtitle: edu.subtitle,
      duration: edu.duration,
      location: edu.location,
      details: edu.details,
    }))}
    styles={styles}
  />
);

export default EducationSection;
