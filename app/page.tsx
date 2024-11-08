import Resume from "@/components/Resume";

import resumeData from "@/app/data.json";
import React from "react";

export default function Home() {
  return (
    <main>
      <Resume data={resumeData} />
    </main>
  );
}
