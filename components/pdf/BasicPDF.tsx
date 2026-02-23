import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

// Basic theme colors - clean and minimal
const colors = {
  primary: "#1C6FC1", // Blue (unified)
  primaryLight: "rgba(28, 111, 193, 0.05)",
  dark: "#111827",
  darkMuted: "#374151",
  lightText: "#6B7280",
  white: "#FFFFFF",
  border: "#E5E7EB",
  accent: "#3B82F6",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: colors.dark,
    backgroundColor: colors.white,
    padding: 24,
  },
  // Header section
  header: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 14,
    marginBottom: 14,
  },
  headerImage: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 14,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 8,
  },
  contactItem: {
    fontSize: 8,
    color: colors.darkMuted,
  },
  // Profile summary in header
  profileSummary: {
    fontSize: 8,
    color: colors.dark,
    lineHeight: 1.5,
    marginTop: 4,
  },
  // Section title
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 8,
    marginTop: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  // Two column layout
  twoColumn: {
    flexDirection: "row",
    gap: 16,
    marginTop: 10,
  },
  column: {
    flex: 1,
  },
  // Experience item
  experienceItem: {
    marginBottom: 10,
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
    color: colors.lightText,
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
    width: 3,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 1.5,
    marginRight: 6,
    marginTop: 4,
  },
  bulletText: {
    fontSize: 8,
    color: colors.dark,
    flex: 1,
    lineHeight: 1.4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginTop: 8,
  },
  // Skills
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillTag: {
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: 7,
    marginBottom: 3,
  },
  // Languages
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  languageName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  star: {
    width: 8,
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  starEmpty: {
    width: 8,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  // Education item (compact)
  educationItem: {
    marginBottom: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  educationTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  educationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  educationLocation: {
    fontSize: 8,
    color: colors.lightText,
  },
  educationDate: {
    fontSize: 8,
    color: colors.lightText,
  },
  // Links
  linkItem: {
    marginBottom: 4,
  },
  linkLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
  },
  linkUrl: {
    fontSize: 7,
    color: colors.primary,
  },
  // Footer section
  footer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

interface BasicPDFProps {
  data: ResumeData;
}

const getStarCount = (level: string): number => {
  const levelMap: { [key: string]: number } = {
    native: 5,
    fluent: 5,
    advanced: 4,
    intermediate: 3,
    basic: 2,
    beginner: 1,
  };
  return levelMap[level.toLowerCase()] || 3;
};

const BasicPDF = ({ data }: BasicPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with image and basic info */}
        <View style={styles.header}>
          <Image src="/profile.png" style={styles.headerImage} />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{data.basicInfo.name}</Text>
            <Text style={styles.jobTitle}>{data.basicInfo.title}</Text>
            <View style={styles.contactRow}>
              <Text style={styles.contactItem}>{data.basicInfo.location}</Text>
              <Text style={styles.contactItem}>{data.basicInfo.phone}</Text>
              <Text style={styles.contactItem}>{data.basicInfo.email}</Text>
            </View>
            <Text style={styles.profileSummary}>{data.basicInfo.summary}</Text>
          </View>
        </View>

        {/* Experience */}
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experiences.items.map((exp, idx) => (
          <View key={idx} style={styles.experienceItem}>
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
            {idx < data.experiences.items.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        ))}

        {/* Two column section: Skills & Education */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Skills</Text>
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
          </View>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.items.map((edu, idx) => (
              <View key={idx} style={styles.educationItem}>
                <Text style={styles.educationTitle}>{edu.title}</Text>
                <View style={styles.educationDetails}>
                  <Text style={styles.educationLocation}>{edu.location}</Text>
                  <Text style={styles.educationDate}>
                    {edu.duration.start} - {edu.duration.end}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer: Languages & Links */}
        <View style={styles.footer}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {data.languages.list.map((lang, idx) => (
              <View key={idx} style={styles.languageItem}>
                <Text style={styles.languageName}>{lang.language}</Text>
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <View
                      key={star}
                      style={
                        star <= getStarCount(lang.level)
                          ? styles.star
                          : styles.starEmpty
                      }
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
          {data.basicInfo.links && data.basicInfo.links.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Links</Text>
              {data.basicInfo.links.map((link, idx) => (
                <View key={idx} style={styles.linkItem}>
                  <Text style={styles.linkLabel}>{link.label}</Text>
                  <Text style={styles.linkUrl}>{link.url}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default BasicPDF;
