import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Adress" component={HomeScreen} />
      
    </Stack.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
