import React from 'react';
import {Image} from 'react-native';
import LogoDarkImage from '../../assets/logo-dark.png';

export default function Logo() {
  return <Image source={LogoDarkImage} style={{width: 120, height: 52}} />;
}
