import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setToken, setUserData} from '../redux/slice/userSlice';
import {Background} from '../components';

export default function SplashScreen({navigation}: any) {
  const dispatch = useDispatch();

  async function refreshToken() {
    try {
      const credential: any = await EncryptedStorage.getItem('user_credential');
      const {data} = await axios.post(
        'https://dev.pondokdigital.pondokqu.id/api/login',
        JSON.parse(credential),
        {headers: {'Content-Type': 'application/json'}},
      );
      dispatch(setToken(data.token));
      dispatch(setUserData(data.user));
      navigation.replace('Home');
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        navigation.replace('Login');
      }, 2000);
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/qr-code.png')}
          style={{width: 100, height: 100}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
