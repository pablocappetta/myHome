import React from "react";
import { UserProvider } from "./contexts/UserContext";
import Navigator from "./screens/Navigator/Navigator";
import { ThemeProvider } from "./contexts/ThemeContext";

export const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Navigator />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
