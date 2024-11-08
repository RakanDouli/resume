// LinksSection.tsx
import { FC } from "react";
import { Links } from "@/types/resume";
import { FiLink } from "react-icons/fi";
interface LinksSectionProps {
  links: Links[];
}

const LinksSection: FC<LinksSectionProps> = ({ links }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold flex items-center gap-4 text-gray-800 dark:text-white">
        <FiLink />
        Links
      </h2>
      <ul className="mt-4 flex items-center gap-8">
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
