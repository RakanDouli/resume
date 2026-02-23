// LinksSection.tsx
import { FC } from "react";
import { Links } from "@/types/resume";
import { FiLink } from "react-icons/fi";
import { SectionTitle, TinyText } from "../Text";
interface LinksSectionProps {
  links: Links[];
}

const LinksSection: FC<LinksSectionProps> = ({ links }) => {
  return (
    <section className="text-dark">
      <SectionTitle className="flex items-center gap-sm text-dark">
        <FiLink />
        Links
      </SectionTitle>
      <ul className="mt-sm flex flex-col gap-xs">
        {links.map((link, index) => (
          <li key={index} className="flex flex-col">
            <span className="font-semibold text-dark">{link.label}:</span>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-dark transition-all ease-in-out duration-300 break-all"
            >
              <TinyText>{link.url}</TinyText>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LinksSection;
