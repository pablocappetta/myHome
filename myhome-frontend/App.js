import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./screens/Home/Home";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Login">
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Inicio",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="My Properties"
            component={Home}
            options={{
              tabBarLabel: "Mis Propiedades",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="shopping"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Home}
            options={{
              tabBarLabel: "Ajustes",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
