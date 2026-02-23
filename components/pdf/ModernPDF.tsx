import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

// Modern theme colors - unified blue
const colors = {
  primary: "#1C6FC1", // Blue (unified)
  primaryLight: "rgba(28, 111, 193, 0.05)",
  dark: "#111827",
  darkMuted: "#374151",
  lightText: "#6B7280",
  white: "#FFFFFF",
  lightGray: "#EEEDE8", // Beige/peige to match web theme
  border: "#E5E7EB",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: colors.dark,
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  sidebar: {
    width: "30%",
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  main: {
    width: "70%",
    padding: 16,
  },
  // Profile image
  imageContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 6,
  },
  // Name and title
  name: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    textAlign: "left",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    textAlign: "left",
    marginBottom: 12,
  },
  // Contact info
  contactSection: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactItem: {
    marginBottom: 6,
  },
  contactLabel: {
    fontSize: 7,
    color: colors.lightText,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  contactValue: {
    fontSize: 8,
    color: colors.dark,
  },
  // Section title
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 8,
    marginTop: 4,
  },
  sidebarSectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 6,
    marginTop: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  // Skills
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  skillTag: {
    backgroundColor: colors.white,
    color: colors.dark,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: 7,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // Languages
  languageItem: {
    marginBottom: 8,
  },
  languageName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 3,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  // Links
  linkItem: {
    marginBottom: 6,
  },
  linkLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 1,
  },
  linkUrl: {
    fontSize: 7,
    color: colors.primary,
  },
  // Profile section with accent bar
  profileSection: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: 10,
    marginBottom: 14,
  },
  profileTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 6,
  },
  profileText: {
    fontSize: 9,
    color: colors.dark,
    lineHeight: 1.5,
  },
  // Experience item
  experienceItem: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  experienceItemLast: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    flex: 1,
  },
  experienceDate: {
    fontSize: 8,
    color: colors.primary,
    fontFamily: "Helvetica-Bold",
  },
  experienceLocation: {
    fontSize: 8,
    color: colors.lightText,
    marginBottom: 4,
  },
  bulletList: {
    marginTop: 4,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 3,
    paddingRight: 8,
  },
  bullet: {
    width: 4,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: 6,
    marginTop: 3,
  },
  bulletText: {
    fontSize: 8,
    color: colors.dark,
    flex: 1,
    lineHeight: 1.4,
  },
});

interface ModernPDFProps {
  data: ResumeData;
}

const getProgressWidth = (level: string): string => {
  const levelMap: { [key: string]: string } = {
    native: "100%",
    fluent: "100%",
    advanced: "80%",
    intermediate: "60%",
    basic: "40%",
    beginner: "20%",
  };
  return levelMap[level.toLowerCase()] || "60%";
};

const ModernPDF = ({ data }: ModernPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Profile Image */}
          <View style={styles.imageContainer}>
            <Image src="/profile.png" style={styles.image} />
          </View>

          {/* Name & Title */}
          <Text style={styles.name}>{data.basicInfo.name}</Text>
          <Text style={styles.jobTitle}>{data.basicInfo.title}</Text>

          {/* Contact Info */}
          <View style={styles.contactSection}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Location</Text>
              <Text style={styles.contactValue}>{data.basicInfo.location}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{data.basicInfo.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>{data.basicInfo.email}</Text>
            </View>
          </View>

          {/* Skills */}
          <Text style={styles.sidebarSectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.technical.map((skill, idx) => (
              <Text key={idx} style={styles.skillTag}>
                {skill}
              </Text>
            ))}
            {data.skills.other.map((skill, idx) => (
              <Text key={`other-${idx}`} style={styles.skillTag}>
                {skill}
              </Text>
            ))}
          </View>

          {/* Languages */}
          <Text style={styles.sidebarSectionTitle}>Languages</Text>
          {data.languages.list.map((lang, idx) => (
            <View key={idx} style={styles.languageItem}>
              <Text style={styles.languageName}>{lang.language}</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: getProgressWidth(lang.level) },
                  ]}
                />
              </View>
            </View>
          ))}

          {/* Links */}
          {data.basicInfo.links && data.basicInfo.links.length > 0 && (
            <>
              <Text style={styles.sidebarSectionTitle}>Links</Text>
              {data.basicInfo.links.map((link, idx) => (
                <View key={idx} style={styles.linkItem}>
                  <Text style={styles.linkLabel}>{link.label}</Text>
                  <Text style={styles.linkUrl}>{link.url}</Text>
                </View>
              ))}
            </>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Profile with accent bar */}
          <View style={styles.profileSection}>
            <Text style={styles.profileTitle}>Profile</Text>
            <Text style={styles.profileText}>{data.basicInfo.summary}</Text>
          </View>

          {/* Experience */}
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experiences.items.map((exp, idx) => (
            <View
              key={idx}
              style={
                idx < data.experiences.items.length - 1
                  ? styles.experienceItem
                  : styles.experienceItemLast
              }
            >
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>
                  {exp.title}
                  {exp.organization ? ` - ${exp.organization}` : ""}
                </Text>
                <Text style={styles.experienceDate}>
                  {exp.duration.start} - {exp.duration.end}
                </Text>
              </View>
              {exp.location && (
                <Text style={styles.experienceLocation}>{exp.location}</Text>
              )}
              {exp.details && (
                <View style={styles.bulletList}>
                  {exp.details.map((detail, dIdx) => (
                    <View key={dIdx} style={styles.bulletItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.bulletText}>{detail}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Education */}
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.items.map((edu, idx) => (
            <View
              key={idx}
              style={
                idx < data.education.items.length - 1
                  ? styles.experienceItem
                  : styles.experienceItemLast
              }
            >
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>{edu.title}</Text>
                <Text style={styles.experienceDate}>
                  {edu.duration.start} - {edu.duration.end}
                </Text>
              </View>
              {edu.location && (
                <Text style={styles.experienceLocation}>{edu.location}</Text>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ModernPDF;
