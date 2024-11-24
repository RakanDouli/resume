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

const Classic: FC<ResumeProps> = ({ data }) => {
  return (
    <>
      {" "}
      <div className="classic_theme flex sm:pt-xl pt-md pb-2xl">
        <div className="flex flex-col gap-lg w-[37%] border-r sm:px-xl px-md">
          <ResumeImage
            imageUrl={data.basicInfo.photoUrl}
            name={data.basicInfo.name}
            styles={{
              border: true,
              borderRadius: true,
              shadow: false,
              circle: false,
            }}
          />
          <BasicInfoSection data={data.basicInfo} />
          <ProfileText data={data.basicInfo} />
          <SkillsSection
            styles={{
              border: true,
              borderRadius: true,
              shadow: false,
            }}
            skills={data.skills}
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
          {data.basicInfo.links && (
            <LinksSection links={data.basicInfo.links} />
          )}
        </div>
        <div className="flex flex-col gap-lg w-[63%] sm:px-xl px-md ">
          <ExperienceSection
            experiences={data.experiences}
            styles={{
              underline: true,
              border: false,
              borderRadius: false,
              shadow: false,
            }}
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
        </div>
      </div>
    </>
  );
};

export default Classic;
