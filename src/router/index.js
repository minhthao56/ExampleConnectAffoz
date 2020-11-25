import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';
import {Login, Home, Connect, Profile, ConnectStack} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function Router() {
  const [isShowHome, setIsShowHome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const changeView = useSelector((state) => state.changeView);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const value = await AsyncStorage.getItem('accessToken');

        if (value !== null) {
          setIsShowHome(true);
        } else {
          setIsShowHome(false);
        }
      } catch (e) {
        setIsShowHome(false);
      }
      setIsLoading(false);
    };
    getData();
  }, [changeView]);

  return (
    <NavigationContainer>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isShowHome || changeView ? (
        <>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'ConnectStack') {
                  iconName = 'wifi';
                } else if (route.name === 'Profile') {
                  iconName = 'user';
                }

                // You can return any component that you like here!
                return (
                  <Icon
                    name={iconName}
                    size={size}
                    color={color}
                    type="feather"
                  />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: '#facd02',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="ConnectStack" component={ConnectStack} />

            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
          {/* <Stack.Navigator>
            <Stack.Screen name="DetailConnect" component={DetailConnect} />
          </Stack.Navigator> */}
        </>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Auth" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
