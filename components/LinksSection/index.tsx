// LinksSection.tsx
import { FC } from "react";
import { Links } from "@/types/resume";
import { FiLink } from "react-icons/fi";
import { SectionTitle } from "../Text";
interface LinksSectionProps {
  links: Links[];
}

const LinksSection: FC<LinksSectionProps> = ({ links }) => {
  return (
    <section>
      <SectionTitle className="flex items-center gap-sm ">
        <FiLink />
        Links
      </SectionTitle>
      <ul className="mt-sm flex items-center gap-md">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline transition-all"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LinksSection;
