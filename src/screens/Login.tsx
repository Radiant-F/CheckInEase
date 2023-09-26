import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {Background, Gap} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native';
import {TouchableNativeFeedback} from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {setToken, setUserData} from '../redux/slice/userSlice';

export default function Login({navigation}: any) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [secureText, setSecureText] = useState(true);

  const [loading, setLoading] = useState(false);
  async function submitForm() {
    setLoading(true);
    try {
      const {data} = await axios.post(
        'https://dev.pondokdigital.pondokqu.id/api/login',
        {email, password},
        {headers: {'Content-Type': 'application/json'}},
      );
      await EncryptedStorage.setItem(
        'user_credential',
        JSON.stringify({email, password}),
      );
      dispatch(setToken(data.token));
      dispatch(setUserData(data.user));
      setLoading(false);
      navigation.replace('Home');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.container}>
        <Text style={styles.textTitle}>Masuk</Text>
        <Gap height={25} />
        <Text style={{color: 'black', width: '85%'}}>Email</Text>
        <View style={styles.viewInput}>
          <Icon name="gmail" color={'black'} size={25} />
          <TextInput
            placeholder="contoh@email.com"
            placeholderTextColor={'grey'}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Gap height={15} />
        <Text style={{color: 'black', width: '85%'}}>Password</Text>
        <View style={styles.viewInput}>
          <Icon name="lock" color={'black'} size={25} />
          <TextInput
            placeholder="Kata sandi..."
            placeholderTextColor={'grey'}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={secureText}
          />
          <Icon
            name={secureText ? 'eye-off-outline' : 'eye-outline'}
            color={'black'}
            size={25}
            onPress={() => setSecureText(!secureText)}
          />
        </View>
        <Gap height={25} />
        <TouchableNativeFeedback useForeground onPress={submitForm}>
          <View style={styles.btnSubmit}>
            {loading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={styles.textSubmit}>Masuk</Text>
            )}
          </View>
        </TouchableNativeFeedback>
        <Gap height={10} />
        <TouchableNativeFeedback
          useForeground
          onPress={() => navigation.navigate('Register')}>
          <View
            style={{
              ...styles.btnSubmit,
              backgroundColor: '#3ADE00',
              width: 150,
            }}>
            <Text style={styles.textSubmit}>Daftar</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    flex: 1,
    color: 'black',
  },
  textSubmit: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  btnSubmit: {
    width: '70%',
    backgroundColor: '#D4CB00',
    borderRadius: 5,
    elevation: 3,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInput: {
    flexDirection: 'row',
    width: '85%',
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textTitle: {
    color: 'black',
    fontSize: 27,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
