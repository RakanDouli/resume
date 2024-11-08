// LanguagesSection.tsx
import { FC } from "react";
import { Language } from "@/types/resume";
import { MdLanguage } from "react-icons/md";
interface LanguagesSectionProps {
  languages: Language[];
}

const LanguagesSection: FC<LanguagesSectionProps> = ({ languages }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold flex items-center gap-4 text-gray-800 dark:text-white">
        <MdLanguage />
        Languages
      </h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {languages.map((language, idx) => (
          <span
            key={idx}
            className="px-6 py-2 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition-all"
          >
            {language.language} ({language.level})
          </span>
        ))}
      </div>
    </section>
  );
};

export default LanguagesSection;
