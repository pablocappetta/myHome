import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home/Home";
import { UserProvider } from "./contexts/UserContext";
import UserProfile from "./screens/UserProfile/UserProfile";

const Tab = createMaterialBottomTabNavigator();

export const App = () => {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarLabel: "Inicio",
                tabBarIcon: "home",
              }}
            />
            <Tab.Screen
              name="Mi Perfil"
              component={UserProfile}
              options={{
                tabBarLabel: "Mi Perfil",
                tabBarIcon: "account",
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
};

export default App;
