import { StyleSheet } from "@react-pdf/renderer";

// Professional color palette - unified blue
export const colors = {
  // Primary brand color - unified blue
  primary: "#1C6FC1",
  primaryLight: "rgba(28, 111, 193, 0.05)",

  // Text colors
  dark: "#111827",
  darkMuted: "#374151",
  lightText: "#6B7280",

  // Background colors
  white: "#FFFFFF",
  lightGray: "#F8FAFC",
  sidebarBg: "#F5F8FE", // Light blue tint (matches bg-primary/5)

  // Accent colors
  accent: "#3B82F6",
  border: "#E5E7EB",
  borderDark: "#D1D5DB",
};

// Shared typography
export const fonts = {
  sectionTitle: 12,
  title: 11,
  subtitle: 10,
  body: 9,
  small: 8,
};

// Base styles used across all themes
export const baseStyles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: fonts.body,
    color: colors.dark,
    backgroundColor: colors.white,
  },

  // Section title (Experience, Education, etc.)
  sectionTitle: {
    fontSize: fonts.sectionTitle,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  // Item title (Job title, Degree, etc.)
  itemTitle: {
    fontSize: fonts.title,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },

  // Subtitle/Organization
  subtitle: {
    fontSize: fonts.subtitle,
    fontFamily: "Helvetica",
    color: colors.darkMuted,
  },

  // Body text
  body: {
    fontSize: fonts.body,
    fontFamily: "Helvetica",
    color: colors.dark,
    lineHeight: 1.4,
  },

  // Small/muted text
  small: {
    fontSize: fonts.small,
    fontFamily: "Helvetica",
    color: colors.lightText,
  },

  // Bullet point
  bulletPoint: {
    width: 4,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: 6,
    marginTop: 4,
  },

  // Skill tag
  skillTag: {
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: fonts.small,
    marginRight: 4,
    marginBottom: 4,
  },

  // Divider
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginVertical: 8,
  },
});

// Classic theme specific styles
export const classicStyles = StyleSheet.create({
  page: {
    ...baseStyles.page,
    flexDirection: "row",
  },
  sidebar: {
    width: "32%",
    backgroundColor: colors.sidebarBg,
    padding: 20,
    borderRightWidth: 2,
    borderRightColor: colors.primary,
  },
  main: {
    width: "68%",
    padding: 20,
  },
  sidebarSection: {
    marginBottom: 16,
  },
  sidebarTitle: {
    fontSize: fonts.sectionTitle,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 8,
  },
});

// Modern theme specific styles
export const modernStyles = StyleSheet.create({
  page: {
    ...baseStyles.page,
    flexDirection: "row",
  },
  sidebar: {
    width: "30%",
    backgroundColor: colors.lightGray,
    padding: 20,
  },
  main: {
    width: "70%",
    padding: 20,
    backgroundColor: colors.white,
  },
  profileSection: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: 10,
    marginBottom: 16,
  },
});

// Basic theme specific styles
export const basicStyles = StyleSheet.create({
  page: {
    ...baseStyles.page,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 16,
    marginBottom: 16,
  },
  headerImage: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 20,
  },
  column: {
    flex: 1,
  },
});
