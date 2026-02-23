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
    <div className="classic_theme flex">
      {/* Left Sidebar */}
      <div className="flex flex-col gap-sm w-[30%] bg-primary/5 p-md border-r-2 border-primary">
        <div className="flex justify-center">
          <div className="w-[70%]">
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

        <div className="border-t border-primary/30 pt-sm">
          <SkillsSection
            styles={{
              border: false,
              borderRadius: true,
              shadow: false,
            }}
            skills={data.skills}
          />
        </div>

        <div className="border-t border-primary/30 pt-sm">
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
          <div className="border-t border-primary/30 pt-sm">
            <LinksSection links={data.basicInfo.links} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-sm w-[70%] p-md">
        <ProfileText data={data.basicInfo} />

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

export default Classic;
