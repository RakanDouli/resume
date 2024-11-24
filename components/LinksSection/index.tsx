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
    <section>
      <SectionTitle className="flex items-center gap-sm ">
        <FiLink />
        Links
      </SectionTitle>
      <ul className="mt-sm flex flex-col gap-sm">
        {links.map((link, index) => (
          <li key={index} className="flex flex-col gap-sm">
            {link.label} :
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-all  ease-in-out duration-300"
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
