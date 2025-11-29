"use client";

import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { CiDark, CiLight } from "react-icons/ci";
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDarkMode(theme === "dark");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark");

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="flex items-center gap-2">
      <CiLight />
      <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
      <CiDark />
    </div>
  );
};

export default DarkModeToggle;
