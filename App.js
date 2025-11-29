
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import QuoteScreen from './src/screens/QuoteScreen';
import MapScreen from './src/screens/MapScreen';
import PhotoScreen from './src/screens/PhotoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Quotes" component={QuoteScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Photos" component={PhotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
