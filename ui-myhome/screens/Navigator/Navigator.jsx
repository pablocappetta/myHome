import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Home from "../Home/Home";
import UserProfile from "../UserProfile/UserProfile";
import Settings from "../Settings/Settings";
import { useTheme } from "../../contexts/ThemeContext";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Login/Login";
import ListingPost from "../Home/ListingPost/ListingPost";
import { Platform } from "react-native";
import Notifications from "../Notifications/Notifications";
import NewPost from "../NewPost/NewPost";
import HomeOwner from "../Home/HomeOwner";
import NotificationView from "../Notifications/NotificationView";
import Signin from "../Login/Signin";
import Register from "../Login/Register";
import { notifications } from "../Notifications/mock/notificationsMock";

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
      <Stack.Screen name="Home" component={HomeOwner} />
      <Stack.Screen name="Perfil" component={UserProfile} />
      <Stack.Screen name="Login" component={Signin} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Post" component={ListingPost} />
      <Stack.Screen name="NewPost" component={NewPost} />
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

const NotificationsScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notificaciones"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Notificaciones" component={Notifications} />
      <Stack.Screen name="Notificacion" component={NotificationView} />
    </Stack.Navigator>
  );
};

const UserProfileScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Perfil"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Perfil" component={UserProfile} />
      <Stack.Screen name="Ajustes" component={Settings} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const { theme } = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="tabHome"
        theme={theme}
        activeColor={theme.colors.primary}
        labeled={true}
        barStyle={Platform.OS === "ios" && { height: 96 }}
      >
        <Tab.Screen
          name="tabNotificaciones"
          component={NotificationsScreenRoutes}
          options={{
            tabBarLabel: "Notificaciones",
            tabBarIcon: "bell",
            tabBarBadge: notifications.length,
          }}
        />
        <Tab.Screen
          name="tabHome"
          component={HomeScreenRoutes}
          options={{
            tabBarLabel: "Mis Publicaciones",
            tabBarIcon: "file-document-multiple-outline",
          }}
        />
        <Tab.Screen
          name="tabPerfil"
          component={UserProfileScreenRoutes}
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: "account",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
