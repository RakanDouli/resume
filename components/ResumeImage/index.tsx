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

const HeaderSection: FC<HeaderSectionProps> = ({ name, styles }) => {
  const containerClasses = [
    "overflow-hidden",
    styles?.border ? "border border-dark p-1" : "",
    styles?.borderRadius ? "rounded-lg" : "",
    styles?.circle ? "rounded-full" : "",
    styles?.shadow ? "shadow-lg" : "",
  ].join(" ");

  return (
    <div className={`flex-shrink-0 relative aspect-square ${containerClasses}`}>
      <Image
        src={"/profile.png"}
        alt={`${name} image`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority
      />
    </div>
  );
};

export default HeaderSection;
