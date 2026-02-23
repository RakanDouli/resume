// BasicInfoSection.tsx
import { FC } from "react";
import { BasicInfo } from "@/types/resume"; // Import BasicInfo type
import { Paragraph, Subtitle, Title } from "../Text";
import { ImLocation, ImPhone, ImMail3, ImWhatsapp } from "react-icons/im";

interface BasicInfoProps {
  data: BasicInfo;
}

const BasicInfoSection: FC<BasicInfoProps> = ({ data }) => (
  <div className="basic-info text-dark">
    <Title className="text-dark font-bold">{data.name}</Title>
    <Subtitle className="text-primary font-semibold">{data.title}</Subtitle>
    <Paragraph className="flex gap-sm items-center text-dark">
      <ImLocation className="flex-shrink-0" />
      {data.location}
    </Paragraph>
    <Paragraph className="flex gap-sm items-center text-dark hover:text-primary transition-all ease-in-out duration-300">
      <ImPhone className="flex-shrink-0" />
      <a target="_blank" href={`tel:${data.phone}`}>
        {data.phone}
      </a>
    </Paragraph>
    <Paragraph className="flex gap-sm items-center text-dark hover:text-primary transition-all ease-in-out duration-300">
      <ImWhatsapp className="flex-shrink-0" />
      <a
        target="_blank"
        href={`https://wa.me/${data.phone}?text=Hello%20${data.name}!.`}
      >
        {data.phone}
      </a>
    </Paragraph>
    <Paragraph className="flex gap-sm items-center text-dark hover:text-primary transition-all ease-in-out duration-300">
      <ImMail3 className="flex-shrink-0" />
      <a target="_blank" href={`mailto:${data.email}`}>
        {data.email}
      </a>
    </Paragraph>
  </div>
);

export default BasicInfoSection;
