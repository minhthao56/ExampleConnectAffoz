import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

import {Button} from '../components';
import {changeLogin} from '../redux/slice/changeView';

export default function Profile() {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      AsyncStorage.clear();
      dispatch(changeLogin());
      RNRestart.Restart();
    } catch (error) {
      Alert.alert('Đăng xuất lỗi! ');
    }
  };
  return (
    <View>
      <Button onPress={handleSignOut}>Đăng xuất</Button>
    </View>
  );
}
