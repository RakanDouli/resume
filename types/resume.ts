// "@/types/resume.ts"

export interface BasicInfo {
  photoUrl: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  linkedin: string;
  drivingLicense: string;
  drivingLicenseType?: string;
  title: string;
  summary: string;
  additionalLinks?: Links[]; // using Links[] for consistency
}

export interface Links {
  label: string;
  url: string;
}

export interface Duration {
  start: string;
  end: string;
}

export interface Experience {
  role: string;
  company: string;
  location?: string;
  duration: Duration;
  details: string[];
}

export interface Education {
  program: string;
  institution: string;
  duration: Duration;
  location?: string;
  degree?: string;
  year?: string;
}

export interface Skills {
  technical: string[];
  other: string[];
}
// Language: Beginner, Intermediate, Advanced, Fluent, Native
export interface Language {
  language: string;
  level: string;
}

export interface ResumeData {
  basicInfo: BasicInfo;
  ResumeImage?: {
    photoUrl: string;
    name: string;
  };

  experience: Experience[];
  education: Education[];
  skills: Skills;
  languages: Language[];
}
