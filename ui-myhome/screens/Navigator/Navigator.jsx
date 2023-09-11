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
import BookingDate from "../Booking/BookingDate/BookingDate";
import BookingInfo from "../Booking/BookingInfo/BookingInfo";
import BookingPayment from "../Booking/BookingPayment/BookingPayment";
import BookingSummary from "../Booking/BookingSummary/BookingSummary";
import { Platform } from "react-native";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const BookingRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Date"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Date" component={BookingDate} />
      <Stack.Screen name="Info" component={BookingInfo} />
      <Stack.Screen name="Payment" component={BookingPayment} />
      <Stack.Screen name="Summary" component={BookingSummary} />
    </Stack.Navigator>
  );
};

const HomeScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Perfil" component={UserProfile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Post" component={ListingPost} />
      <Stack.Screen name="Booking" component={BookingRoutes} />
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
      <Tab.Navigator
        initialRouteName="tabHome"
        theme={theme}
        activeColor={theme.colors.primary}
        labeled={true}
        barStyle={Platform.OS === "ios" && { height: 96 }}
      >
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
