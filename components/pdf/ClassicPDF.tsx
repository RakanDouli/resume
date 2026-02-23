import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { colors, fonts } from "./styles";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: colors.dark,
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  sidebar: {
    width: "32%",
    backgroundColor: colors.sidebarBg,
    padding: 16,
    borderRightWidth: 2,
    borderRightColor: colors.primary,
  },
  main: {
    width: "68%",
    padding: 16,
  },
  // Profile image
  imageContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    border: `1px solid ${colors.border}`,
  },
  // Name and title
  name: {
    fontSize: 16,
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
  },
  contactItem: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "flex-start",
  },
  contactLabel: {
    fontSize: 8,
    color: colors.lightText,
    width: 50,
  },
  contactValue: {
    fontSize: 8,
    color: colors.dark,
    flex: 1,
  },
  // Section title
  sectionTitle: {
    fontSize: fonts.sectionTitle,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 8,
    marginTop: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sidebarSectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 6,
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
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: 7,
    marginBottom: 3,
  },
  // Languages
  languageItem: {
    marginBottom: 6,
  },
  languageName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: colors.dark,
    marginBottom: 2,
  },
  languageLevel: {
    fontSize: 8,
    color: colors.lightText,
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
  // Profile text
  profileText: {
    fontSize: 9,
    color: colors.dark,
    lineHeight: 1.5,
    marginBottom: 12,
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
    paddingRight: 10,
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
});

interface ClassicPDFProps {
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

const ClassicPDF = ({ data }: ClassicPDFProps) => {
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
          {/* Profile */}
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text style={styles.profileText}>{data.basicInfo.summary}</Text>

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

          {/* Education */}
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.items.map((edu, idx) => (
            <View key={idx} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>{edu.title}</Text>
                <Text style={styles.experienceDate}>
                  {edu.duration.start} - {edu.duration.end}
                </Text>
              </View>
              {edu.location && (
                <Text style={styles.experienceLocation}>{edu.location}</Text>
              )}
              {idx < data.education.items.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ClassicPDF;
