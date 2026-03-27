import React from "react";
import useDarkMode from "./useDarkMode";
import { BiMoon, BiSun } from "react-icons/bi";
const ColorModeToggle = () => {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <button
      aria-label="toggle colormode"
      onClick={() => setTheme(colorTheme === "light" ? "light" : "dark")}
      className="cursor-pointer rounded-lg border border-black/10 bg-[rgba(249,250,251,0.68)] p-2 text-gray-800 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:border-white/10 dark:bg-[rgba(17,17,17,0.62)] dark:text-gray-100 dark:hover:bg-white/10 dark:focus-visible:ring-white/40"
    >
      {colorTheme === "light" ? (
        <span>
          <BiSun className="" size="20px" />
        </span>
      ) : (
        <span>
          <BiMoon size="20px" />
        </span>
      )}
    </button>
  );
};

export default ColorModeToggle;
