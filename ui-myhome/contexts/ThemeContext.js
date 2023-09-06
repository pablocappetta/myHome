import React, { createContext, useState, useContext } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(MD3DarkTheme);

  const toggleTheme = () => {
    setTheme(theme === MD3LightTheme ? MD3DarkTheme : MD3LightTheme);
  };

  const store = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={store}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
