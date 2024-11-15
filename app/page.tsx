import Resume from "@/components/Resume";
import resumeData from "@/app/data.json"; // Assuming data is in JSON format
import { ResumeData } from "@/types/resume"; // Importing the type
import React from "react";

// Type annotation for resumeData
const data: ResumeData = resumeData;

export default function Home() {
  return (
    <main>
      <Resume data={data} />
    </main>
  );
}
