module.exports = {
  // FSD layers. Every layer directory MUST be listed here — Tailwind only
  // generates classes it can see, so a missing glob renders that layer unstyled.
  // `features/` is listed pre-emptively: the slice does not exist yet, but the
  // glob is harmless and stops the next agent from hitting an unstyled UI.
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./widgets/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./entities/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1441px",
    },
    colors: {
      // BRAND(fe-theme): indigo-600 #4F46E5. This is the far end of the Modern
      // theme's banner gradient (violet-600 #7C3AED -> indigo-600 #4F46E5), so
      // the app chrome now belongs to the same family as the Modern resume
      // instead of fighting it with the old blue.
      //
      // Indigo and not violet, for two reasons:
      //  1. CONTRAST. Every `primary` surface in this app is white-on-primary
      //     (Button variant="primary", ConfirmDialog confirm, both SiteHeader
      //     action pills, RatingInput filled dot). White on #4F46E5 is 6.29:1;
      //     white on #7C3AED is 5.70:1. The header pills render at
      //     `text-clamp-xs` (10-12px), where the extra headroom matters.
      //  2. SEPARATION. Modern's in-card ACCENT stays #7C3AED. If the chrome
      //     were also #7C3AED the resume card's accent and the page chrome
      //     would be the same pixel and the card would dissolve into the page.
      //
      // MUST stay identical to `--primary` / `$primary` in
      // app/styles/variables.scss. Those two drifted from this one before
      // (#639FBB vs rgb(28,111,193)); that is what this pass fixed.
      primary: {
        DEFAULT: "rgb(79, 70, 229)",
        5: "rgba(79, 70, 229, 0.05)",
        10: "rgba(79, 70, 229, 0.1)",
        20: "rgba(79, 70, 229, 0.2)",
        30: "rgba(79, 70, 229, 0.3)",
      },
      // UNUSED(fe-theme): no `bg-/text-/border-secondary` or `-third` class
      // exists anywhere in app|widgets|entities|shared, and no SCSS reads
      // $secondary/$third either. These are warm leftovers from the pre-violet
      // brand and they WOULD clash if anyone reached for them. Left in place
      // deliberately — deleting a palette entry is a cleanup call, not a theme
      // call. Flagged for removal.
      secondary: "rgb(226, 155, 114)",
      third: "rgb(219, 209, 158)",
      dark: {
        DEFAULT: "#1a1a1a",
        70: "rgba(26, 26, 26, 0.7)",
        50: "rgba(26, 26, 26, 0.5)",
        20: "rgba(26, 26, 26, 0.2)",
      },
      light: {
        DEFAULT: "#ffffff",
        20: "rgba(255, 255, 255, 0.2)",
        50: "rgba(255, 255, 255, 0.5)",
      },
      // SURFACE(fe-theme): was the warm rgb(238, 237, 232). Now a cool,
      // faintly violet-tinted gray. It is the app's only divider/border colour
      // AND an inactive-chip surface, so it has to read against white cards
      // and against bodyBg: 1.28:1 on #ffffff and 1.20:1 on #F8F7FC, both up
      // from the old warm value's near-invisible 1.17:1 / 1.10:1.
      // text-dark on it as a chip surface is 13.62:1.
      // MUST stay identical to `--light-gray` / `$light-gray`, which had ALSO
      // drifted from each other (238,237,232 vs 235,237,238).
      lightgray: "rgb(228, 226, 240)",
      transparent: "transparent",
      modalBg: "rgba(0, 0, 0, 0.4)",
      successBg: "rgb(196, 239, 232)",
      successText: "rgb(55, 162, 147)",
      errorBg: "rgb(251, 219, 223)",
      errorText: "rgb(243, 71, 78)",
      // SURFACE(fe-theme correction 1): PURE WHITE, by explicit user request.
      // Was the violet-tinted #F8F7FC; before that the warm beige #F7F6F2.
      //
      // CONSEQUENCE, read before you use this token: `bodyBg` and `light` are
      // now THE SAME COLOUR. Nothing on this page can be separated from the
      // page by a background tint any more, because there is no tint left.
      // Every card, panel and floating surface therefore separates with
      // BORDER + SHADOW (`border-lightgray` / `ring-lightgray` + a `shadow-*`),
      // never with a background step. Do not "fix" a flat-looking surface by
      // reintroducing an off-white fill — that is how the tint crept back in
      // twice already. Add or strengthen the shadow instead.
      //
      // Text on it: text-dark 17.40:1, gray-600 7.56:1, primary 6.29:1.
      // MUST stay identical to `--body-bg` / `$body-bg`.
      bodyBg: "#FFFFFF",
      // UNCHANGED(fe-theme), on purpose. This is already Tailwind's COOL
      // (blue-leaning) neutral ramp, so it needs no re-tinting to sit under
      // indigo — the thing that clashed was the warm SURFACES above, not these.
      // Re-tinting would move gray-600 off its 7.56:1-on-white AAA footing for
      // no visual gain. NOTE: there is deliberately no gray-500; adding one, or
      // using `gray-500`, silently renders inherited near-black.
      gray: {
        300: "#d1d5db",
        400: "#9ca3af",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
      },
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "nav-height": "var(--nav-height)",
      },
      maxWidth: {
        "90vw": "90vw",
      },
      fontSize: {
        "clamp-xs": ["clamp(10px, 1.5vw, 12px)", { lineHeight: "1.4" }],
        "clamp-sm": ["clamp(11px, 1.8vw, 13px)", { lineHeight: "1.5" }],
        "clamp-md": ["clamp(13px, 2vw, 15px)", { lineHeight: "1.4" }],
        "clamp-lg": ["clamp(16px, 2.5vw, 20px)", { lineHeight: "1.3" }],
        "clamp-xl": ["clamp(18px, 3vw, 24px)", { lineHeight: "1.2" }],
        "clamp-2xl": ["clamp(22px, 3.5vw, 28px)", { lineHeight: "1.2" }],
      },
    },
  },
  plugins: [],
};
