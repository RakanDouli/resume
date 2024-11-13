// BasicInfoSection.tsx
import { FC } from "react";
import { BasicInfo } from "@/types/resume"; // Import BasicInfo type
import { Paragraph, Subtitle, Title } from "../Text";
import { ImLocation, ImPhone, ImMail3, ImWhatsapp } from "react-icons/im";

interface BasicInfoProps {
  data: BasicInfo;
}

const BasicInfoSection: FC<BasicInfoProps> = ({ data }) => (
  <div className="basic-info">
    <Title>{data.name}</Title>
    <Subtitle>{data.title}</Subtitle>
    <Paragraph className="flex gap-sm items-center">
      <ImLocation />
      {data.location}
    </Paragraph>

    <Paragraph className="flex gap-sm items-center">
      <ImPhone />
      <a href={`tel:${data.phone}`}>{data.phone} </a>
    </Paragraph>
    <Paragraph className="flex gap-sm items-center">
      <ImWhatsapp />
      <a href={`tel:${data.whatsApp}`}>{data.whatsApp} </a>
    </Paragraph>

    {/* Email link */}

    <Paragraph className="flex gap-sm items-center">
      <ImMail3 />
      <a href={`mailto:${data.email}`}>{data.email} </a>
    </Paragraph>

    <Paragraph>{data.summary}</Paragraph>
  </div>
);

export default BasicInfoSection;
