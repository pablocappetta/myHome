import React from "react";
import { UserProvider } from "./contexts/UserContext";
import Navigator from "./screens/Navigator/Navigator";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import NetworkStatus from "./components/NetworkStatus/NetworkStatus";


export const App = () => {
  return (
    <FirebaseProvider>
      <ThemeProvider>
        <UserProvider>
          <Navigator />
          <NetworkStatus />
        </UserProvider>
      </ThemeProvider>
    </FirebaseProvider>
  );
};

export default App;
