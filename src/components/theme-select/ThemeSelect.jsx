import React, { useState } from "react";
import { useSetTheme, useTheme } from "../context/ThemeContext";
import "./_theme_select.scss";
import { motion } from "framer-motion";
const ThemeSelect = () => {
  const setTheme = useSetTheme();
  const { themeMode } = useTheme();

  const handleThemeSelect = () => {
    switch (themeMode) {
      case "light":
        return <i className="gg-sun"></i>;
      case "dark":
        return <i className="gg-moon"></i>;
      case "mixed":
        return <i className="gg-edit-highlight"></i>;
      default:
        return null;
    }
  };
  const handleThemeChanged = React.useCallback(
    (e) => {
      // const theme = e.target.checked;
      // theme ? setTheme("light") : setTheme("dark");
      setTheme(e.target.value);
    },
    [setTheme]
  );
  return (
    <>
      <div className="theme-select-container text-white">
        {handleThemeSelect()}
        <select name="color" value={themeMode} onChange={handleThemeChanged}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>
    </>
  );
};

export default ThemeSelect;
