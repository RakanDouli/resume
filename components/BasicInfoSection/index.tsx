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
      <a target="_blank" href={`tel:${data.phone}`}>
        {data.phone}{" "}
      </a>
    </Paragraph>
    <Paragraph className="flex gap-sm items-center">
      <ImWhatsapp />
      <a
        target="_blank"
        href={`https://wa.me/${data.whatsApp}?text=Hello%20${data.name}!.`}
      >
        {data.whatsApp}
      </a>
    </Paragraph>

    {/* Email link */}

    <Paragraph className="flex gap-sm items-center">
      <ImMail3 />
      <a target="_blank" href={`mailto:${data.email}`}>
        {data.email}{" "}
      </a>
    </Paragraph>
  </div>
);

export default BasicInfoSection;
