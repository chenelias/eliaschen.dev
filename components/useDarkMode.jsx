import { useEffect, useState } from "react";

function useDarkMode() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.theme === undefined
        ? window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : localStorage.theme
      : "light"
  );
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return [colorTheme, setTheme];
}

export default useDarkMode;
