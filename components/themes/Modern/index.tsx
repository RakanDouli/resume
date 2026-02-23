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
    <div className="modern_theme flex">
      {/* Left Sidebar */}
      <div className="flex flex-col gap-sm w-[32%] p-md border-r border-dark/20">
        <div className="flex justify-center">
          <div className="w-[80%]">
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
          </div>
        </div>

        <BasicInfoSection data={data.basicInfo} />

        <div className="border-t border-dark/20 pt-sm">
          <SkillsSection
            styles={{
              border: true,
              borderRadius: true,
              shadow: false,
            }}
            skills={data.skills}
          />
        </div>

        <div className="border-t border-dark/20 pt-sm">
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

        {data.basicInfo.links && (
          <div className="border-t border-dark/20 pt-sm">
            <LinksSection links={data.basicInfo.links} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-sm w-[68%] p-md bg-light">
        <div className="border-l-4 border-primary pl-sm">
          <ProfileText data={data.basicInfo} />
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
  );
};

export default Modern;
