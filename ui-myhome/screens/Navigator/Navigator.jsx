import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Home from "../Home/Home";
import UserProfile from "../UserProfile/UserProfile";
import Settings from "../Settings/Settings";
import { useTheme } from "../../contexts/ThemeContext";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Mi Perfil" component={UserProfile} />
    </Stack.Navigator>
  );
};

const SettingsScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Ajustes"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Ajustes" component={Settings} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const { theme } = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator initialRouteName="tabHome" theme={theme}>
        <Tab.Screen
          name="tabHome"
          component={HomeScreenRoutes}
          options={{
            tabBarLabel: "Inicio",
            tabBarIcon: "home",
          }}
        />
        <Tab.Screen
          name="tabAjustes"
          component={SettingsScreenRoutes}
          options={{
            tabBarLabel: "Ajustes",
            tabBarIcon: "cog",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
