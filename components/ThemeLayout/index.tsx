"use client";
import { FC, useState, useEffect, ComponentType, RefObject } from "react";
import Image from "next/image";
import { ResumeData } from "@/types/resume";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import { Title } from "../Text";

interface ResumeProps {
  data: ResumeData;
  resumeTemplateRef?: RefObject<HTMLDivElement>;
}

const themeNames = ["Basic", "Classic", "Modern"];

const loadThemeComponent = (
  themeName: string
): Promise<ComponentType<ResumeProps>> => {
  return import(`@/components/themes/${themeName}`).then(
    (module) => module.default
  );
};

const ThemeLayout: FC<ResumeProps> = ({ data, resumeTemplateRef }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>("Basic");
  const [ThemeComponent, setThemeComponent] =
    useState<ComponentType<ResumeProps> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    loadThemeComponent(selectedTheme)
      .then((LoadedComponent) => {
        setThemeComponent(() => LoadedComponent);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading theme:", error);
        setLoading(false);
      });
  }, [selectedTheme]);

  return (
    <section className="container">
      <div className="theme-switcher overflow-hidden relative flex flex-col mb-md shadow-lg w-full bg-light rounded-lg">
        <span
          className="flex hover:bg-primary hover:text-light ease-in-out duration-300 transition-all gap-sm p-sm items-center justify-center cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Title className="text-center">Select Theme</Title>
          <span className="text-xl">
            {" "}
            {open ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
          </span>
        </span>
        <div
          style={{
            maxHeight: open ? "500px" : "0",
            overflow: !open ? "hidden" : "",
            transition: "all 0.2s ease",
          }}
        >
          <span className="p-md flex gap-sm overflow-x-scroll">
            {themeNames.map((themeName) => (
              <div
                key={themeName}
                onClick={() => setSelectedTheme(themeName)}
                className="cursor-pointer min-w-[100px]"
              >
                <Image
                  src={`/${themeName}.png`}
                  alt={`${themeName} Theme`}
                  width={200}
                  height={200}
                  className={`w-24 h-24 rounded border-2 border-lightgray p-xs ${
                    selectedTheme === themeName ? "border-2 border-primary" : ""
                  }`}
                  priority
                />
                <p className="text-center mt-2 capitalize">{themeName}</p>
              </div>
            ))}
          </span>
        </div>
      </div>

      <div
        ref={resumeTemplateRef}
        className="Resume-template bg-light rounded-md shadow-lg overflow-hidden"
      >
        {loading ? (
          <div className="h-[80vh] w-full flex justify-center items-center">
            <div className="flex justify-center items-center h-40">
              <div className="w-xl h-xl border-4 border-t-4 border-third border-solid rounded-full animate-spin border-t-secondary"></div>
            </div>
          </div>
        ) : (
          ThemeComponent && <ThemeComponent data={data} />
        )}
      </div>
    </section>
  );
};

export default ThemeLayout;
