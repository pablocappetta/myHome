import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Home from "./Home/Home";
import UserProfile from "./UserProfile/UserProfile";
import Settings from "./Settings/Settings";
import { useTheme } from "../contexts/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  const { theme } = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" theme={theme}>
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
        <Tab.Screen
          name="Ajustes"
          component={Settings}
          options={{
            tabBarLabel: "Ajustes",
            tabBarIcon: "cog",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigator;
