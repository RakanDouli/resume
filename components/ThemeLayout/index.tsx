// ThemeLayout.tsx
import { FC } from "react";
import { ResumeData } from "@/types/resume";

import BasicInfoSection from "@/components/BasicInfoSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import LanguagesSection from "@/components/LanguagesSection";
import LinksSection from "@/components/LinksSection";
import ResumeImage from "@/components/ResumeImage";

interface ResumeProps {
  data: ResumeData;
}

const ThemeLayout: FC<ResumeProps> = ({ data }) => {
  return (
    <div className="container mx-auto p-6 sm:p-8 space-y-10">
      <ResumeImage
        imageUrl={data.basicInfo.photoUrl}
        name={data.basicInfo.name}
      />
      <BasicInfoSection data={data.basicInfo} />
      <ExperienceSection experiences={data.experience} />
      <SkillsSection skills={data.skills} />
      <EducationSection education={data.education} />
      <LanguagesSection languages={data.languages} />
      {data.basicInfo.additionalLinks && (
        <LinksSection links={data.basicInfo.additionalLinks} />
      )}
    </div>
  );
};

export default ThemeLayout;
