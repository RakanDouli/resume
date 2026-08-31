import { FC } from "react";
import {
  SECTION_LABELS,
  SectionHeading,
  EntryBlock,
  SkillPills,
  LanguageDots,
  ProfilePhoto,
  DEFAULT_THEME_COLORS,
  linkIconFor,
} from "@/entities/resume";
import type { ThemeProps } from "../registry";

const Basic: FC<ThemeProps> = ({ data, language = "en" }) => {
  const t = SECTION_LABELS[language];
  // User-overridable per theme; falls back to the original hardcoded teal so
  // a resume that predates this feature looks byte-for-byte the same.
  const ACCENT = data.themeColors?.Basic?.accent ?? DEFAULT_THEME_COLORS.Basic.accent;
  const RULE = `2px solid ${ACCENT}20`;

  return (
    <div className="bg-light rounded-md p-lg sm:p-xl flex flex-col gap-lg max-w-[1000px] mx-auto">
      {/* Header */}
      <div className="text-center flex flex-col gap-xs pb-md border-b border-gray-300">
        {/* Basic is a centred, symmetrical sheet — the photo sits on the axis,
            above the name. No wrapper element: ProfilePhoto renders NOTHING when
            `photoUrl` is missing or broken, and an empty wrapper would still
            eat a `gap-xs` and shift the header. `mx-auto` centres it as a flex
            item. */}
        <ProfilePhoto
          src={data.photoUrl}
          alt={data.name}
          size={130}
          className="mx-auto mb-sm"
          photoStyle={data.photoStyle?.Basic}
        />
        <h1 className="text-clamp-2xl font-extrabold text-dark">{data.name}</h1>
        <p className="text-clamp-lg font-medium" style={{ color: ACCENT }}>
          {data.jobTitle}
        </p>
        <div className="flex flex-wrap justify-center gap-sm text-clamp-xs text-gray-600 mt-xs">
          {data.location && <span>{data.location}</span>}
          {data.phone && (
            <span>
              · <a href={`tel:${data.phone.replace(/\s+/g, "")}`}>{data.phone}</a>
            </span>
          )}
          {data.email && (
            <span>
              · <a href={`mailto:${data.email}`}>{data.email}</a>
            </span>
          )}
          {data.dateOfBirth && <span>· {data.dateOfBirth}</span>}
          {data.drivingLicense && (
            <span>
              · {t.drivingLicense}: {data.drivingLicense}
              {data.drivingLicenseType ? ` (${data.drivingLicenseType})` : ""}
            </span>
          )}
        </div>
        {data.links?.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-md text-clamp-xs mt-xs">
            {data.links.map((l, i) => {
              const Icon = linkIconFor(l);
              return (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-[5px] underline"
                  style={{ color: ACCENT }}
                >
                  <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  {l.label}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {data.summary && (
        <p className="text-clamp-sm text-gray-700 leading-relaxed">
          {data.summary}
        </p>
      )}

      {data.experience?.length > 0 && (
        <div>
          <SectionHeading color={ACCENT} rule={RULE}>
            {t.experience}
          </SectionHeading>
          {data.experience.map((e, i) => (
            <EntryBlock key={i} entry={e} accent={ACCENT} />
          ))}
        </div>
      )}

      {data.projects?.length > 0 && (
        <div>
          <SectionHeading color={ACCENT} rule={RULE}>
            {t.projects}
          </SectionHeading>
          {data.projects.map((e, i) => (
            <EntryBlock key={i} entry={e} accent={ACCENT} />
          ))}
        </div>
      )}

      {data.education?.length > 0 && (
        <div>
          <SectionHeading color={ACCENT} rule={RULE}>
            {t.education}
          </SectionHeading>
          {data.education.map((e, i) => (
            <div key={i} className="flex justify-between mb-xs flex-wrap gap-xs">
              <div>
                <div className="font-bold text-dark text-clamp-sm">
                  {e.title}
                </div>
                <div className="text-gray-600 text-clamp-xs">
                  {e.organization}
                  {e.location ? `, ${e.location}` : ""}
                </div>
              </div>
              <span className="text-gray-400 text-clamp-xs whitespace-nowrap">
                {e.start} — {e.end}
              </span>
            </div>
          ))}
        </div>
      )}

      {data.skills?.length > 0 && (
        <div>
          <SectionHeading color={ACCENT} rule={RULE}>
            {t.skills}
          </SectionHeading>
          <SkillPills skills={data.skills} accent={ACCENT} />
        </div>
      )}

      {data.languages?.length > 0 && (
        <div>
          <SectionHeading color={ACCENT} rule={RULE}>
            {t.languages}
          </SectionHeading>
          <div className="flex flex-wrap gap-lg">
            {data.languages.map((l, i) => (
              <div key={i} className="flex items-center gap-xs">
                <span className="text-clamp-sm text-dark font-medium">
                  {l.language}
                </span>
                <LanguageDots rating={l.rating} accent={ACCENT} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Basic;
