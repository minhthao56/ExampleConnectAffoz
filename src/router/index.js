import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';
import Toast from 'react-native-toast-message';

import {Login, Home, Profile, ConnectStack} from '../screens';
import {getCurrentUser} from '../redux/slice/currentUserSlice';
import {changeLogin} from '../redux/slice/changeView';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function Router() {
  const [isShowHome, setIsShowHome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const changeView = useSelector(state => state.changeView);
  const dispatch = useDispatch();

  const handleGetCurrentUser = async () => {
    try {
      dispatch(getCurrentUser());
    } catch (error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Hết phiên làm việc',
        text2: 'Vui lòng đăng nhập lại !!! ',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 10,
        bottomOffset: 40,
      });
      await AsyncStorage.clear();
      dispatch(changeLogin());
    }
  };

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

  useEffect(() => {
    handleGetCurrentUser();
  }, [changeView]);

  return (
    <>
      <Toast ref={ref => Toast.setRef(ref)} />
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
          </>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Auth" component={Login} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}
