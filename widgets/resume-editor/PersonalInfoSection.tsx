"use client";

import type { ResumeData } from "@/entities/resume";
import { Field, TextArea } from "@/shared/ui";
import { EditorCard } from "./EditorCard";

export interface PersonalInfoSectionProps {
  data: ResumeData;
  onPatch: (patch: Partial<ResumeData>) => void;
}

/**
 * Name/contact/summary fields only — the photo (PhotoSection) and per-theme
 * appearance (AppearanceSection) each got split into their own cards, ahead
 * of this one in the panel order.
 */
export function PersonalInfoSection({ data, onPatch }: PersonalInfoSectionProps) {
  return (
    <EditorCard title="Personal info">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <Field
          label="Full name"
          value={data.name}
          placeholder="Jane Doe"
          autoComplete="off"
          onChange={(v) => onPatch({ name: v })}
        />
        <Field
          label="Job title"
          value={data.jobTitle}
          placeholder="Full-Stack Developer"
          onChange={(v) => onPatch({ jobTitle: v })}
        />
        <Field
          label="Email"
          type="email"
          value={data.email}
          placeholder="you@example.com"
          onChange={(v) => onPatch({ email: v })}
        />
        <Field
          label="Phone"
          type="tel"
          value={data.phone}
          placeholder="+31 6 12345678"
          onChange={(v) => onPatch({ phone: v })}
        />
        <Field
          label="WhatsApp"
          type="tel"
          value={data.whatsApp ?? ""}
          hint="Optional — leave blank if it is the same as your phone"
          onChange={(v) => onPatch({ whatsApp: v })}
        />
        <Field
          label="Location"
          value={data.location}
          placeholder="Utrecht, Netherlands"
          onChange={(v) => onPatch({ location: v })}
        />
        <Field
          label="Date of birth"
          value={data.dateOfBirth ?? ""}
          placeholder="DD-MM-YYYY"
          hint="Optional"
          onChange={(v) => onPatch({ dateOfBirth: v })}
        />
        <Field
          label="Driving license"
          value={data.drivingLicense ?? ""}
          placeholder="Available"
          hint="Optional"
          onChange={(v) => onPatch({ drivingLicense: v })}
        />
        <Field
          label="Driving license type"
          value={data.drivingLicenseType ?? ""}
          placeholder="Standard"
          hint="Optional"
          onChange={(v) => onPatch({ drivingLicenseType: v })}
        />
      </div>

      <TextArea
        label="Profile summary"
        rows={6}
        hint="Two or three sentences. This is the first thing anyone reads."
        placeholder="I am a…"
        value={data.summary}
        onChange={(v) => onPatch({ summary: v })}
      />
    </EditorCard>
  );
}

export default PersonalInfoSection;
