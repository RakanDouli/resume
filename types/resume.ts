export interface BasicInfo {
  fieldTitle: string;
  photoUrl: string;
  name: string;
  location: string;
  phone: string;
  whatsApp: string;
  email: string;
  dateOfBirth: string;
  drivingLicense: string;
  drivingLicenseType?: string;
  title: string;
  summary: string;
  links?: Links[];
}

export interface Links {
  label: string;
  url: string;
}

export interface Duration {
  start: string;
  end: string;
}

export interface SectionItem {
  title: string;
  subtitle?: string;
  location?: string;
  duration: Duration;
  details?: string[];
  type?: string;
}

// Experience type updated to include the "items" array structure
export interface Experience {
  fieldTitle: string;
  items: SectionItem[]; // `items` is now an array of SectionItem
}

// Education interface updated similarly
export interface Education {
  fieldTitle: string;
  items: SectionItem[]; // `items` is now an array of SectionItem
}

export interface Skills {
  fieldTitle: string;
  technical: string[];
  other: string[];
}

export interface Language {
  language: string;
  level: string;
}

export interface Languages {
  fieldTitle: string;
  list: Language[];
}

export interface ResumeImage {
  photoUrl: string;
  name: string;
}

export interface ResumeData {
  basicInfo: BasicInfo;
  ResumeImage?: ResumeImage;
  experiences: Experience; // `experience` is now an object with a `fieldTitle` and `items` array
  education: Education; // Similar to experience
  skills: Skills;
  languages: Languages;
}
