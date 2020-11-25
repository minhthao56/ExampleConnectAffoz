import {unwrapResult} from '@reduxjs/toolkit';
import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Input, Button, Logo} from '../components';
import {login} from '../redux/slice/authSlice';
import {changeHome} from '../redux/slice/changeView';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const action = login({username, password});
      const resultDispacth = await dispatch(action);
      const {accessToken} = unwrapResult(resultDispacth);
      await AsyncStorage.setItem('accessToken', accessToken);
      await dispatch(changeHome());
    } catch (error) {
     Alert.alert("Email, số điện thoại hoặc mật khẩu của bạn sai!!!")
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.logo}>
        <Logo />
      </View>
      <View style={Styles.from}>
        <Input
          placeholder="Email/Phone"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Button onPress={handleLogin}>Đăng nhập</Button>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  from: {
    flex: 3,
  },
});
