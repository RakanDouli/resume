// HeaderSection.tsx
import { FC } from "react";
import Image from "next/image";

interface HeaderSectionProps {
  name: string;
  imageUrl: string;
}

const HeaderSection: FC<HeaderSectionProps> = ({ name, imageUrl }) => {
  console.log(imageUrl);
  return (
    <div className="flex-shrink-0">
      <Image
        src={"/Screenshot 2024-11-07 at 20.11.34.png"}
        alt={`${name} image`}
        width={300}
        height={300}
        className="rounded-full border-4 p-1"
      />
    </div>
  );
};

export default HeaderSection;
