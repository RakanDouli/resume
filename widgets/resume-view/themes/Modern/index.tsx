import { FC } from "react";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
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

/**
 * A real opaque color, not a translucent tint — `${accent}0F`-style alpha
 * hex works fine sitting on plain white (which is all it ever sat on before
 * the summary box started overlapping the gradient banner), but the exact
 * same translucent film over the SOLID accent-colored banner is nearly
 * invisible: a 6%-opacity purple wash over solid purple still looks like
 * solid purple. This mixes the accent with white at a fixed ratio into one
 * concrete, fully opaque color instead, so the box reads clearly no matter
 * what's behind it — the gradient above the seam, or plain white below it.
 */
function tintOnWhite(hex: string, whiteWeight = 0.93): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const mix = (c: number) => Math.round(c * (1 - whiteWeight) + 255 * whiteWeight);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/**
 * Experience gets its OWN markup here rather than the shared
 * `TimelineItem`/`EntryBlock` pair Projects still uses below — per this
 * entity's own rule ("a theme that needs a different treatment keeps its own
 * markup"), the date-as-pill styling and the continuous connecting line
 * between dots are Modern-specific, not a `variant` flag bolted onto a
 * component two other themes also render.
 */

/**
 * Modern: gradient banner + a single full-width white card.
 *
 * Deliberately NOT a sidebar layout — that is Classic's shape, and the three
 * themes have to read as clearly different at a glance. Responsive on its own:
 * the standalone `Mobile` theme was deleted, so the banner padding scales and
 * the Education/Skills row collapses to one column below `md`.
 */
const Modern: FC<ThemeProps> = ({ data, language = "en" }) => {
  const t = SECTION_LABELS[language];
  // User-overridable per theme. The gradient itself moves from a Tailwind
  // arbitrary-value class to an inline `style` below — `bg-gradient-to-r
  // from-[...] to-[...]` can't take a runtime value, only a class Tailwind
  // saw at build time.
  const ACCENT = data.themeColors?.Modern?.accent ?? DEFAULT_THEME_COLORS.Modern.accent;
  const GRADIENT_END =
    data.themeColors?.Modern?.gradientEnd ?? DEFAULT_THEME_COLORS.Modern.gradientEnd;
  const RULE = `2px solid ${ACCENT}20`;
  const hasEducation = data.education?.length > 0;
  const hasSkills = data.skills?.length > 0;

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* Gradient banner */}
      <header
        className="relative text-light rounded-t-md px-lg pt-lg pb-2xl sm:px-xl sm:pt-xl sm:pb-2xl flex flex-col gap-md"
        style={{ background: `linear-gradient(to right, ${ACCENT}, ${GRADIENT_END})` }}
      >
        {/* Modern puts the photo IN the gradient banner, beside the name — a
            horizontal lockup, not Basic's stacked centre or Classic's sidebar
            column. When there is no usable photo ProfilePhoto renders nothing,
            the row has a single child, and the banner is byte-for-byte what it
            is today. */}
        <div className="flex items-center gap-md">
          <ProfilePhoto
            src={data.photoUrl}
            alt={data.name}
            size={110}
            photoStyle={data.photoStyle?.Modern}
          />
          <div className="min-w-0">
            <h1 className="text-clamp-2xl font-extrabold tracking-tight">
              {data.name}
            </h1>
            {data.jobTitle && (
              <p className="text-clamp-lg font-medium text-light/80 mt-[2px]">
                {data.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* One row: icon+text for location/phone/email (the reference design's
            treatment), plain text for the fields that have no obvious
            universal icon, and the links inline as underlined text rather
            than the separate pill-button row this used to render below. */}
        <ul className="flex flex-wrap items-center gap-x-md gap-y-xs text-clamp-xs text-light/90 list-none">
          {data.location && (
            <li className="flex items-center gap-[5px]">
              <FiMapPin aria-hidden="true" className="h-3 w-3 shrink-0" />
              {data.location}
            </li>
          )}
          {data.phone && (
            <li className="flex items-center gap-[5px]">
              <FiPhone aria-hidden="true" className="h-3 w-3 shrink-0" />
              <a href={`tel:${data.phone.replace(/\s+/g, "")}`}>{data.phone}</a>
            </li>
          )}
          {data.email && (
            <li className="flex items-center gap-[5px]">
              <FiMail aria-hidden="true" className="h-3 w-3 shrink-0" />
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </li>
          )}
          {data.dateOfBirth && <li>{data.dateOfBirth}</li>}
          {data.drivingLicense && (
            <li>
              {t.drivingLicense}: {data.drivingLicense}
              {data.drivingLicenseType ? ` (${data.drivingLicenseType})` : ""}
            </li>
          )}
          {data.links?.map((l, i) => {
            const Icon = linkIconFor(l);
            return (
              <li key={i}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-[5px] underline decoration-light/50 hover:decoration-light"
                >
                  <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* No "Profile" heading — the reference design doesn't have one for
            this box, it doesn't need one: the tinted card is already enough
            to read as a distinct, callout-style block.
            ANCHORED BY `top`, NOT `bottom` — this is the actual fix for the
            bug in the screenshots (summary text colliding with the contact
            row above it): `bottom: -40px` makes how far the box pokes UP
            into the header depend on the box's own height (a short bio and a
            long one poke up by different amounts, and a long enough one
            reaches the contact row — exactly what happened). `top:
            calc(100%-28px)` instead fixes the box's TOP edge at a constant
            28px above the header's bottom edge NO MATTER HOW TALL THE TEXT
            IS — the box only ever grows downward into the white body card
            from that fixed point, never upward into the header's own
            content. 28px comfortably clears the header's own `pb-2xl`
            bottom padding, so it can't reach the contact row at any
            breakpoint. The `<header>` needs `position: relative` (added
            above) for this to anchor correctly; `z-20` and the opaque
            `tintOnWhite` background (not a translucent accent tint, which is
            invisible over a solid accent-colored gradient) make it actually
            visible against the purple. The body card's `pt-[120px]` gives its
            own content clearance below the box's downward overhang. */}
        {data.summary && (
          <p
            className="absolute inset-x-lg sm:inset-x-xl top-[calc(100%-28px)] z-20 text-clamp-sm text-gray-700 leading-relaxed rounded-md p-md shadow-md"
            style={{ backgroundColor: tintOnWhite(ACCENT) }}
          >
            {data.summary}
          </p>
        )}
      </header>

      {/* Body card. `pt-[120px]` (not `py-lg`'s usual top value) — see the
          summary box's own comment above for why this needs extra top
          clearance now. */}
      <div className="bg-light rounded-b-md shadow-sm px-lg pt-[120px] pb-lg sm:px-xl sm:pt-[120px] sm:pb-xl flex flex-col gap-lg">
        {data.experience?.length > 0 && (
          <section>
            <SectionHeading color={ACCENT} rule={RULE}>
              {t.experience}
            </SectionHeading>
            <div className="relative">
              {/* The connecting line — one continuous element behind every
                  dot, not a line segment per entry, so it never gaps between
                  the last dot of one entry and the first of the next. */}
              <div
                aria-hidden="true"
                className="absolute left-[3px] top-[6px] bottom-[6px] w-[2px]"
                style={{ backgroundColor: `${GRADIENT_END}30` }}
              />
              {data.experience.map((e, i) => (
                <div key={i} className="relative pl-md mb-md last:mb-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[6px] w-[8px] h-[8px] rounded-full"
                    style={{ backgroundColor: GRADIENT_END }}
                  />
                  <div className="flex justify-between items-baseline flex-wrap gap-xs">
                    <span className="font-bold text-dark text-clamp-md">
                      {e.title}
                    </span>
                    <span
                      className="text-clamp-xs rounded-full px-sm py-[1px] whitespace-nowrap"
                      style={{ backgroundColor: `${ACCENT}14`, color: ACCENT }}
                    >
                      {e.start} — {e.end}
                    </span>
                  </div>
                  <div className="text-clamp-sm" style={{ color: ACCENT }}>
                    {e.organization}
                    {e.location ? ` · ${e.location}` : ""}
                  </div>
                  {e.bullets?.length > 0 && (
                    <ul className="list-disc list-inside mt-xs flex flex-col gap-[2px]">
                      {e.bullets.map((b, bi) => (
                        <li key={bi} className="text-clamp-sm text-gray-700">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects?.length > 0 && (
          <section>
            <SectionHeading color={ACCENT} rule={RULE}>
              {t.projects}
            </SectionHeading>
            {data.projects.map((e, i) => (
              <EntryBlock key={i} entry={e} accent={ACCENT} />
            ))}
          </section>
        )}

        {(hasEducation || hasSkills) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {hasEducation && (
              <section>
                <SectionHeading color={ACCENT} rule={RULE}>
                  {t.education}
                </SectionHeading>
                <ul className="flex flex-col gap-md list-none">
                  {data.education.map((e, i) => (
                    <li key={i}>
                      <div className="font-bold text-dark text-clamp-sm">
                        {e.title}
                      </div>
                      <div className="text-clamp-xs text-gray-600">
                        {e.organization}
                        {e.location ? `, ${e.location}` : ""}
                      </div>
                      <div className="flex items-center flex-wrap gap-xs mt-[3px]">
                        <span className="text-clamp-xs text-gray-400 whitespace-nowrap">
                          {e.start} — {e.end}
                        </span>
                        {e.type && (
                          <span
                            className="text-clamp-xs rounded-full px-sm py-[1px]"
                            style={{
                              backgroundColor: `${ACCENT}14`,
                              color: ACCENT,
                            }}
                          >
                            {e.type}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {hasSkills && (
              <section>
                <SectionHeading color={ACCENT} rule={RULE}>
                  {t.skills}
                </SectionHeading>
                <SkillPills skills={data.skills} accent={ACCENT} />
              </section>
            )}
          </div>
        )}

        {data.languages?.length > 0 && (
          <section>
            <SectionHeading color={ACCENT} rule={RULE}>
              {t.languages}
            </SectionHeading>
            <ul className="flex flex-wrap gap-lg list-none">
              {data.languages.map((l, i) => (
                <li key={i} className="flex flex-col gap-[3px]">
                  <span className="text-clamp-sm font-medium text-dark">
                    {l.language}
                  </span>
                  {l.level && (
                    <span className="text-clamp-xs text-gray-600">
                      {l.level}
                    </span>
                  )}
                  <LanguageDots rating={l.rating} accent={ACCENT} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default Modern;
