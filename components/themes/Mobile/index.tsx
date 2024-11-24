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
      <div className="Mobile_theme flex flex-col gap-lg pt-xl pb-2xl sm:px-xl px-md  ">
        <div className="flex items-center flex-col md:flex-row gap-lg ">
          <span className="md:w-[33%] w-full">
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

          <div className="flex flex-col gap-sm md:w-[67%] w-full">
            <BasicInfoSection data={data.basicInfo} />
            <ProfileText data={data.basicInfo} />
          </div>
        </div>

        <ExperienceSection
          experiences={data.experiences}
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
        {data.basicInfo.links && <LinksSection links={data.basicInfo.links} />}
      </div>
    </div>
  );
};

export default Basic;
