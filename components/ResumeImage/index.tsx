// HeaderSection.tsx
import { FC } from "react";
import Image from "next/image";

interface HeaderSectionProps {
  name: string;
  imageUrl: string;
  styles?: {
    border?: boolean;
    borderRadius?: boolean;
    circle?: boolean;
    shadow?: boolean;
  };
}

const HeaderSection: FC<HeaderSectionProps> = ({ name, imageUrl, styles }) => {
  // console.log(imageUrl);
  const itemClasses = [
    styles?.border ? "border border-dark" : "",
    styles?.borderRadius ? "rounded-lg" : "",
    styles?.circle ? "rounded-full" : "",
    styles?.shadow ? "shadow-lg" : "",
    " p-1 object-cover",
  ].join(" ");
  return (
    <div className="flex-shrink-0 flex md:justify-start justify-center ">
      <Image
        src={"/Screenshot 2024-11-07 at 20.11.34.png"}
        alt={`${name} image`}
        width={300}
        height={300}
        className={itemClasses}
        priority
      />
    </div>
  );
};

export default HeaderSection;
