import React, { createContext, useState, useContext } from "react";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { StatusBar } from "react-native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(CombinedDarkTheme);
  const [statusBarBackground, setStatusBarBackground] = useState("transparent");

  const toggleTheme = () => {
    setTheme(
      theme === CombinedDarkTheme ? CombinedDefaultTheme : CombinedDarkTheme
    );
  };

  const store = {
    theme,
    toggleTheme,
    setStatusBarBackground,
  };

  return (
    <ThemeContext.Provider value={store}>
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        translucent={true}
        backgroundColor={statusBarBackground}
      />
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
