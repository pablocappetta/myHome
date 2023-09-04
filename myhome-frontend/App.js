import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { PropertyScreen } from './screens/PropertyScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MyHome" component={HomeScreen} />
        <Stack.Screen name="Property" component={PropertyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;