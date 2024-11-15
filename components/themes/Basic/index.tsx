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

const Basic: FC<ResumeProps> = ({ data }) => {
  return (
    <div>
      {" "}
      <div className="basic_theme flex flex-col gap-lg sm:pt-xl pt-md pb-2xl sm:px-xl px-md">
        <div className="flex items-center md:flex-row flex-col gap-lg ">
          <span className="w-[33%]">
            <ResumeImage
              imageUrl={data.basicInfo.photoUrl}
              name={data.basicInfo.name}
              styles={{
                border: false,
                borderRadius: true,
                shadow: false,
                circle: false,
              }}
            />
          </span>

          <div className="flex flex-col gap-sm w-[67%]">
            <BasicInfoSection data={data.basicInfo} />
            <ProfileText data={data.basicInfo} />
          </div>
        </div>

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
    </div>
  );
};

export default Basic;
