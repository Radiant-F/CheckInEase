import {Image} from 'react-native';
import React from 'react';

export default function Background() {
  return (
    <Image
      style={{width: '100%', height: '100%', position: 'absolute'}}
      source={require('../../assets/images/background-image.png')}
    />
  );
}
