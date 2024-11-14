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
import ProfileText from "@/components/ProfileText";
interface ResumeProps {
  data: ResumeData;
}

const ThemeLayout: FC<ResumeProps> = ({ data }) => {
  return (
    <section className="container">
      <div className="bg-light rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col gap-lg sm:pt-xl pt-md pb-2xl sm:px-xl px-md">
          <div className="flex md:flex-row flex-col gap-lg ">
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
            <div className="flex flex-col gap-sm">
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
        {/* <div className="flex sm:pt-xl pt-md pb-2xl">
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
            {data.basicInfo.additionalLinks && (
              <LinksSection links={data.basicInfo.additionalLinks} />
            )}
          </div>
          <div className="flex flex-col gap-lg w-[63%] sm:px-xl px-md ">
            <ExperienceSection
              experiences={data.experience}
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
        </div> */}
        {/* <div className="flex">
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
        </div> */}
      </div>
    </section>
  );
};

export default ThemeLayout;
