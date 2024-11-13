// "@/types/resume.ts"

export interface BasicInfo {
  photoUrl: string;
  name: string;
  location: string;
  phone: string;
  whatsApp: string;
  email: string;
  dateOfBirth: string;
  linkedin: string;
  drivingLicense: string;
  drivingLicenseType?: string;
  title: string;
  summary: string;
  additionalLinks?: Links[];
}

export interface Links {
  label: string;
  url: string;
}

export interface Duration {
  start: string;
  end: string;
}

// Shared interface for both Education and Experience items
export interface SectionItem {
  title: string;
  subtitle?: string;
  location?: string;
  duration: Duration;
  details?: string[];
  type?: string;
}

// Updated Experience interface
export interface Experience extends SectionItem {
  organization: string; // New field to match JSON structure
}

// Updated Education interface
export interface Education extends SectionItem {
  organization: string;
  degree?: string;
}

export interface Skills {
  technical: string[];
  other: string[];
}

export enum LanguageLevel {
  Beginner = 1, // 1 star
  Intermediate = 2, // 2 stars
  Advanced = 3, // 3 stars
  Fluent = 4, // 4 stars
  Native = 5, // 5 stars
}

// Language interface with level as the enum
export interface Language {
  language: string;
  level: LanguageLevel; // Numeric value with associated text
}

export interface ResumeImage {
  photoUrl: string;
  name: string;
}

export interface ResumeData {
  basicInfo: BasicInfo;
  ResumeImage?: ResumeImage;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  languages: Language[];
}
