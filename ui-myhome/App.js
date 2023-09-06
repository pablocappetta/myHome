import React from "react";
import { UserProvider } from "./contexts/UserContext";
import BottomNavigator from "./screens/BottomNavigator";
import { ThemeProvider } from "./contexts/ThemeContext";

export const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <BottomNavigator />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
