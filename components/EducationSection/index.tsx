import { FC } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { Education } from "@/types/resume";
import CummonFieldsSection from "@/components/CummonFieldsSection";

interface EducationSectionProps {
  education: Education[];
  styles?: {
    underline?: boolean;
    border?: boolean;
    borderRadius?: boolean;
    shadow?: boolean;
  };
}

const EducationSection: FC<EducationSectionProps> = ({ education, styles }) => (
  <CummonFieldsSection
    title="Education"
    icon={<FaGraduationCap />}
    items={education.map((edu) => ({
      title: edu.title,
      subtitle: edu.organization,
      duration: edu.duration,
      location: edu.location,
      details: edu.degree ? [edu.degree] : undefined,
    }))}
    styles={styles}
  />
);

export default EducationSection;
