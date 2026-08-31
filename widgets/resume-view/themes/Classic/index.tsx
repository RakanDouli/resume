import { FC } from "react";
import {
  SECTION_LABELS,
  SectionHeading,
  EntryBlock,
  TimelineItem,
  ProfilePhoto,
  DEFAULT_THEME_COLORS,
  linkIconFor,
} from "@/entities/resume";
import type { ThemeProps } from "../registry";

const RULE = "1px solid #E5E7EB";

/**
 * Sidebar heading. Deliberately NOT the shared `SectionHeading`: this is a
 * different type scale (clamp-xs / tracking-widest / no rule) sitting on a dark
 * ground, and merging the two would mean a `variant` prop that swaps out every
 * single style it owns.
 */
function SidebarHeading({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <h2
      className="text-clamp-xs font-bold uppercase tracking-widest mb-xs"
      style={{ color: accent }}
    >
      {children}
    </h2>
  );
}

const Classic: FC<ThemeProps> = ({ data, language = "en" }) => {
  const t = SECTION_LABELS[language];
  // User-overridable per theme, independently — the sidebar's background and
  // its emerald accent text are two different colors, not one slot.
  const NAVY =
    data.themeColors?.Classic?.sidebarBg ?? DEFAULT_THEME_COLORS.Classic.sidebarBg;
  const ACCENT =
    data.themeColors?.Classic?.accent ?? DEFAULT_THEME_COLORS.Classic.accent;

  return (
    <div className="bg-light rounded-md overflow-hidden flex flex-col md:flex-row max-w-[1000px] mx-auto shadow-sm">
      {/* Sidebar */}
      <div
        className="w-full md:w-[34%] p-lg flex flex-col gap-lg text-light"
        style={{ backgroundColor: NAVY }}
      >
        <div>
          {/* Classic is left-aligned on a navy sidebar, so the photo is
              left-aligned too and gets a translucent-white ring to lift it off
              the dark ground — the same ring on Basic's white sheet would be
              invisible. Size/position/ring are the theme's; only the
              hide-when-broken behaviour is shared. */}
          <ProfilePhoto
            src={data.photoUrl}
            alt={data.name}
            size={110}
            className="mb-md"
            photoStyle={data.photoStyle?.Classic}
          />
          <h1 className="text-clamp-xl font-extrabold">{data.name}</h1>
          <p className="text-clamp-sm mt-[2px]" style={{ color: ACCENT }}>
            {data.jobTitle}
          </p>
        </div>

        <div>
          <SidebarHeading accent={ACCENT}>{t.contact}</SidebarHeading>
          <div className="flex flex-col gap-[2px] text-clamp-xs text-gray-300">
            {data.location && <span>{data.location}</span>}
            {data.phone && (
              <a href={`tel:${data.phone.replace(/\s+/g, "")}`}>{data.phone}</a>
            )}
            {data.email && <a href={`mailto:${data.email}`}>{data.email}</a>}
            {data.dateOfBirth && <span>{data.dateOfBirth}</span>}
            {data.drivingLicense && (
              <span>
                {t.drivingLicense}: {data.drivingLicense}
                {data.drivingLicenseType ? ` (${data.drivingLicenseType})` : ""}
              </span>
            )}
          </div>
        </div>

        {data.skills?.length > 0 && (
          <div>
            <SidebarHeading accent={ACCENT}>{t.skills}</SidebarHeading>
            {/* Translucent chips on navy — not the shared `SkillPills`, which is
                the outlined-accent-on-light treatment. */}
            <ul className="flex flex-wrap gap-xs list-none">
              {data.skills.map((s, i) => (
                <li
                  key={i}
                  className="text-clamp-xs px-sm py-[2px] rounded-full bg-white/10"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.languages?.length > 0 && (
          <div>
            <SidebarHeading accent={ACCENT}>{t.languages}</SidebarHeading>
            <div className="flex flex-col gap-xs">
              {data.languages.map((l, i) => (
                <div key={i}>
                  <div className="text-clamp-xs mb-[2px]">{l.language}</div>
                  {/* Segmented bars, not the shared `LanguageDots`: a different
                      graphic for a dark sidebar, not a variant of the dots. */}
                  <div
                    className="flex gap-[2px]"
                    role="img"
                    aria-label={`${l.rating} / 5`}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className="h-[4px] flex-1 rounded-full"
                        style={{
                          backgroundColor:
                            n <= l.rating ? ACCENT : "rgba(255,255,255,0.15)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education?.length > 0 && (
          <div>
            <SidebarHeading accent={ACCENT}>{t.education}</SidebarHeading>
            <div className="flex flex-col gap-sm">
              {data.education.map((e, i) => (
                <div key={i}>
                  <div className="text-clamp-xs font-semibold">{e.title}</div>
                  <div className="text-clamp-xs text-gray-400">
                    {e.organization}
                  </div>
                  <div className="text-clamp-xs text-gray-400">
                    {e.start} — {e.end}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.links?.length > 0 && (
          <div>
            <SidebarHeading accent={ACCENT}>{t.links}</SidebarHeading>
            <div className="flex flex-col gap-xs">
              {data.links.map((l, i) => {
                const Icon = linkIconFor(l);
                return (
                  <div key={i}>
                    <div className="flex items-center gap-[5px] text-clamp-xs font-semibold">
                      <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                      {l.label}
                    </div>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-clamp-xs break-all"
                      style={{ color: ACCENT }}
                    >
                      {l.url}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="w-full md:w-[66%] p-lg flex flex-col gap-lg">
        {data.summary && (
          <div>
            <SectionHeading color={NAVY} rule={RULE}>
              {t.profile}
            </SectionHeading>
            <p className="text-clamp-sm text-gray-700 leading-relaxed">
              {data.summary}
            </p>
          </div>
        )}

        {data.experience?.length > 0 && (
          <div>
            <SectionHeading color={NAVY} rule={RULE}>
              {t.experience}
            </SectionHeading>
            {data.experience.map((e, i) => (
              <TimelineItem key={i} accent={ACCENT}>
                <EntryBlock entry={e} accent={ACCENT} />
              </TimelineItem>
            ))}
          </div>
        )}

        {data.projects?.length > 0 && (
          <div>
            <SectionHeading color={NAVY} rule={RULE}>
              {t.projects}
            </SectionHeading>
            {data.projects.map((e, i) => (
              <EntryBlock
                key={i}
                entry={e}
                accent={ACCENT}
                showLocation={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classic;
