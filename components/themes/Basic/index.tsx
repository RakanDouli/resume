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
    <div className="basic_theme">
      <div className="flex flex-col gap-sm p-md">
        {/* Header Section */}
        <div className="flex items-start flex-row gap-md pb-sm border-b-2 border-primary">
          <span className="w-[18%] flex-shrink-0">
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

          <div className="flex flex-col gap-xs w-[82%]">
            <BasicInfoSection data={data.basicInfo} />
            <ProfileText data={data.basicInfo} />
          </div>
        </div>

        {/* Experience Section */}
        <ExperienceSection
          experiences={data.experiences}
          styles={{
            underline: true,
            border: false,
            borderRadius: false,
            shadow: false,
          }}
        />

        {/* Two Column Layout for Skills & Education */}
        <div className="flex gap-md">
          <div className="w-[50%]">
            <SkillsSection
              styles={{
                border: false,
                borderRadius: true,
                shadow: false,
              }}
              skills={data.skills}
            />
          </div>
          <div className="w-[50%]">
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

        {/* Footer Section */}
        <div className="flex gap-md pt-sm border-t border-dark/20">
          <div className="w-[50%]">
            <LanguagesSection
              styles={{
                rate: true,
                border: false,
                borderRadius: false,
                shadow: false,
              }}
              languages={data.languages}
            />
          </div>
          <div className="w-[50%]">
            {data.basicInfo.links && <LinksSection links={data.basicInfo.links} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basic;
