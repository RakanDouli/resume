// ThemeLayout.tsx
"use client";
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
    <section className="container">
      <div className="bg-light rounded-lg shadow-lg flex flex-col gap-lg sm:pt-xl pt-md pb-2xl sm:px-xl px-md m-sm">
        <ResumeImage
          imageUrl={data.basicInfo.photoUrl}
          name={data.basicInfo.name}
        />
        <BasicInfoSection data={data.basicInfo} />
        <ExperienceSection
          experiences={data.experience}
          styles={{
            underline: true,
            border: false,
            borderRadius: false,
            shadow: false,
          }}
        />
        <SkillsSection
          styles={{
            border: true,
            borderRadius: true,
            shadow: false,
          }}
          skills={data.skills}
        />
        <EducationSection
          education={data.education}
          styles={{
            underline: true,
            border: false,
            borderRadius: false,
            shadow: false,
          }}
        />
        <LanguagesSection
          styles={{
            rate: true,
            border: true,
            borderRadius: true,
            shadow: false,
          }}
          languages={data.languages}
        />
        {data.basicInfo.additionalLinks && (
          <LinksSection links={data.basicInfo.additionalLinks} />
        )}
      </div>
    </section>
  );
};

export default ThemeLayout;
