import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, PresenceScanner, Register, SplashScreen} from '../screens';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={SplashScreen} name="SplashScreen" />
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={Register} name="Register" />
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={PresenceScanner} name="PresenceScanner" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
