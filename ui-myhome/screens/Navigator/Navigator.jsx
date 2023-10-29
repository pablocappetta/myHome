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
import Favorites from "../Favorites/Favorites";
import PrivacyPolicy from "../Settings/PrivacyPolicy/PrivacyPolicy";
import SendQuestion from "../SendQuestion/SendQuestion";
import Review from "../Review/Review";
import Reservations from "../Reservations/Reservations";
import Search from "../Home/Search/Search";

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

const SearchScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Perfil" component={UserProfile} />
      <Stack.Screen name="Post" component={ListingPost} />
      <Stack.Screen name="Booking" component={BookingRoutes} />
      <Stack.Screen name="Login" component={Login} />
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
      initialRouteName="Mis Reservas"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Mis Reservas" component={Reservations} />
      <Stack.Screen name="Post" component={ListingPost} />
      <Stack.Screen name="Booking" component={BookingRoutes} />
    </Stack.Navigator>
  );
};

const MyAccountScreenRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Mi Cuenta"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Mi Cuenta" component={Settings} />
      <Stack.Screen name="Perfil" component={UserProfile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Privacidad" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="tabBuscar"
        theme={theme}
        activeColor={theme.colors.primary}
        labeled={true}
        barStyle={Platform.OS === "ios" && { height: 96 }}
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
};

export default Navigator;
