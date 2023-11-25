"use client";
import React, { useState } from "react";
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
import { notifications } from "../Notifications/mock/notificationsMock";
import BookingDate from "../Booking/BookingDate/BookingDate";
import BookingInfo from "../Booking/BookingInfo/BookingInfo";
import BookingPayment from "../Booking/BookingPayment/BookingPayment";
import BookingSummary from "../Booking/BookingSummary/BookingSummary";
import Favorites from "../Favorites/Favorites";
import PrivacyPolicy from "../Settings/PrivacyPolicy/PrivacyPolicy";
import SendQuestion from "../SendQuestion/SendQuestion";
import Review from "../Review/Review";
import Reservations from "../Reservations/Reservations";
import Search from "../Home/Search/Search";
import ListingReservationCard from "../Reservations/ListingReservationCard/ListingReservationCard";
import Register from "../Login/Register/Register";
import { useUserContext } from "../../contexts/UserContext";
import ForgotPassword from "../Login/ForgotPassword/ForgotPassword";
import PasswordRecovery from "../Login/PasswordRecovery/PasswordRecovery";
import EditProfile from "../UserProfile/EditProfile";

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
      {/* <Stack.Screen name="Perfil" component={UserProfile} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Post" component={ListingPost} />
      <Stack.Screen name="NewPost" component={NewPost} />
    </Stack.Navigator>
  );
};

const NotificationsScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notificaciones"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Notificaciones" component={Notifications} />
      <Stack.Screen name="Notificacion" component={NotificationView} />
    </Stack.Navigator>
  );
};

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

const SearchScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Perfil" component={UserProfile} /> */}
      <Stack.Screen name="Post" component={ListingPost} />
      <Stack.Screen name="Booking" component={BookingRoutes} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
      <Stack.Screen name="SendQuestion" component={SendQuestion} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

const FavoritesScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favoritos"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Favoritos" component={Favorites} />
      <Stack.Screen name="Post" component={ListingPost} />
      <Stack.Screen name="Booking" component={BookingRoutes} />
    </Stack.Navigator>
  );
};

const ReservationsScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="MisReservas"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MisReservas" component={Reservations} />
      <Stack.Screen name="Post" component={ListingReservationCard} />
      <Stack.Screen name="Booking" component={BookingRoutes} />
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

const MyAccountScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="MiCuenta"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MiCuenta" component={Settings} />
      <Stack.Screen name="Perfil" component={UserProfile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Privacidad" component={PrivacyPolicy} />
      <Stack.Screen name="MisReservas" component={Reservations} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
      <Stack.Screen name="EditProf" component={EditProfile} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const { theme } = useTheme();
  const { getUserType } = useUserContext();
  const owner = getUserType() === "realtor";
  const [isTransparent, setIsTransparent] = useState(false);

  if (owner) {
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
              tabBarLabel: "Mis Publicaciones",
              tabBarIcon: "home-circle-outline",
            }}
          />
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
            name="tabMiCuenta"
            component={MyAccountScreenRoutes}
            options={{
              tabBarLabel: "Mi Cuenta",
              tabBarIcon: "account-circle-outline",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  if (!owner) {
    return (
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          initialRouteName="tabBuscar"
          theme={theme}
          activeColor={theme.colors.primary}
          labeled={true}
          barStyle={
            Platform.OS === "ios"
              ? {
                  height: 96,
                  display: isTransparent ? "none" : "",
                }
              : { display: isTransparent ? "none" : "" }
          }
          screenListeners={(props) => {
            setIsTransparent(
              props.route.state?.routes[1]?.name === "Login" ||
                props.route.state?.routes[1]?.name === "Register"
            );
          }}
        >
          <Tab.Screen
            name="tabBuscar"
            component={SearchScreenRoutes}
            options={{
              tabBarLabel: "Buscar",
              tabBarIcon: "magnify",
            }}
          />
          <Tab.Screen
            name="tabMisPublicaciones"
            component={ReservationsScreenRoutes}
            options={{
              tabBarLabel: "Mis Reservas",
              tabBarIcon: "book-outline",
            }}
          />
          <Tab.Screen
            name="tabFavoritos"
            component={FavoritesScreenRoutes}
            options={{
              tabBarLabel: "Favoritos",
              tabBarIcon: "heart-outline",
            }}
          />
          <Tab.Screen
            name="tabMiCuenta"
            component={MyAccountScreenRoutes}
            options={{
              tabBarLabel: "Mi Cuenta",
              tabBarIcon: "account-circle-outline",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};

export default Navigator;
