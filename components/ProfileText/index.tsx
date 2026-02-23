// BasicInfoSection.tsx
import { FC } from "react";
import { BasicInfo } from "@/types/resume"; // Import BasicInfo type
import { Paragraph, SectionTitle } from "../Text";
import { ImProfile } from "react-icons/im";

interface BasicInfoProps {
  data: BasicInfo;
}

const ProfileText: FC<BasicInfoProps> = ({ data }) => (
  <div className="basic-info text-dark">
    <SectionTitle className="flex items-center gap-sm text-dark">
      <ImProfile /> Profile
    </SectionTitle>
    <Paragraph className="text-dark mt-xs">{data.summary}</Paragraph>
  </div>
);

export default ProfileText;
