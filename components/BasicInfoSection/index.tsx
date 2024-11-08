// BasicInfoSection.tsx
import { FC } from "react";
import { BasicInfo } from "@/types/resume"; // Import BasicInfo type

interface BasicInfoProps {
  data: BasicInfo;
}

const BasicInfoSection: FC<BasicInfoProps> = ({ data }) => (
  <div className="basic-info">
    <h1>{data.name}</h1>
    <h3>{data.title}</h3>
    <p>{data.location}</p>
    <p>{data.phone}</p>
    <p>{data.email}</p>

    <p>{data.summary}</p>
    {/* other details */}
  </div>
);

export default BasicInfoSection;
