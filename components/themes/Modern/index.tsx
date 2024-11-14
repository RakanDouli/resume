import { ResumeData } from "@/types/resume";
import { FC } from "react";

import BasicInfoSection from "@/components/BasicInfoSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import LanguagesSection from "@/components/LanguagesSection";
import LinksSection from "@/components/LinksSection";
import ResumeImage from "@/components/ResumeImage";
import ProfileText from "@/components/ProfileText";

interface ResumeProps {
  data: ResumeData;
}
const Modern: FC<ResumeProps> = ({ data }) => {
  return (
    <>
      {" "}
      <div className="modern_theme flex">
        <div className="flex flex-col gap-md w-[37%] bg-lightgray sm:pt-xl pt-md pb-2xl sm:px-xl px-md">
          <ResumeImage
            imageUrl={data.basicInfo.photoUrl}
            name={data.basicInfo.name}
            styles={{
              border: false,
              borderRadius: false,
              shadow: false,
              circle: true,
            }}
          />
          <BasicInfoSection data={data.basicInfo} />
          <SkillsSection
            styles={{
              border: false,
              borderRadius: true,
              shadow: true,
            }}
            skills={data.skills}
          />
          <LanguagesSection
            styles={{
              rate: true,
              border: false,
              borderRadius: true,
              shadow: true,
            }}
            languages={data.languages}
          />
          {data.basicInfo.additionalLinks && (
            <LinksSection links={data.basicInfo.additionalLinks} />
          )}
        </div>
        <div className="flex flex-col gap-md w-[63%] sm:pt-xl pt-md pb-2xl sm:px-xl px-md ">
          <ProfileText data={data.basicInfo} />
          <ExperienceSection
            experiences={data.experience}
            styles={{
              underline: false,
              border: false,
              borderRadius: true,
              shadow: true,
            }}
          />
          <EducationSection
            education={data.education}
            styles={{
              underline: false,
              border: false,
              borderRadius: true,
              shadow: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Modern;
