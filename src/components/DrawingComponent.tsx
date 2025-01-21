import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Excalidraw to avoid SSR issues
const Excalidraw = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw), {
    ssr: false,
    loading: () => <p>Loading Excalidraw...</p>,
  }
);

const DrawingApp = () => {
  const excalidrawRef = useRef(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Detect system theme and set the theme accordingly
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDarkMode ? "dark" : "light");

    // Add a listener for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div style={{ height: "95vh", width: "100%" }}>
      <Excalidraw ref={excalidrawRef} theme={theme} />
    </div>
  );
};

export default DrawingApp;
