import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Connect from './Connect';
import DetailConnect from './DetailConnect';

const Stack = createStackNavigator();
export default function ConnectStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Connect"
          component={Connect}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailConnect"
          component={DetailConnect}
          options={{title: 'Kết nối'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
