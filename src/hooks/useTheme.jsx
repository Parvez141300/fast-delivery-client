import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext/ThemeContext";

const useTheme = () => {
  const themeControl = useContext(ThemeContext);
  return themeControl;
};

export default useTheme;
