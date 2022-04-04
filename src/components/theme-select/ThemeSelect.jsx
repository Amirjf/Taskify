import React, { useState } from "react";
import { useSetTheme, useTheme } from "../context/ThemeContext";
import "./_theme_select.scss";
import { motion } from "framer-motion";
const ThemeSelect = () => {
  const setTheme = useSetTheme();
  const { themeMode } = useTheme();
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);
  const handleThemeChanged = React.useCallback(
    (e) => {
      const theme = e.target.checked;
      theme ? setTheme("light") : setTheme("dark");
    },
    [setTheme]
  );
  console.log(themeMode);
  return (
    <>
      <label className="switch" value={themeMode} onChange={handleThemeChanged}>
        <input type="checkbox" value="light" />
        <span className="slider round">
          {themeMode === "light" ? (
            <i className="gg-moon dark-icon"></i>
          ) : (
            <i className="gg-sun light-icon"></i>
          )}
        </span>
      </label>
    </>
  );
};

export default ThemeSelect;
