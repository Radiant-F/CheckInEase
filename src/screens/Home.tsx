import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import {Background, Gap, Presence} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function Home({navigation}: any) {
  function confirmLogout() {
    Alert.alert('Keluar', 'Sesi Anda akan berakhir.', [
      {
        text: 'Batal',
      },
      {
        text: 'Keluar',
        onPress: async () => {
          await EncryptedStorage.removeItem('user_credential');
          navigation.replace('Login');
        },
      },
    ]);
  }

  return (
    <View style={{flex: 1}}>
      <Background />
      <Gap height={10} />
      <View style={styles.viewHeader}>
        <Icon
          name="logout"
          color={'black'}
          size={25}
          style={{transform: [{rotate: '180deg'}]}}
          onPress={confirmLogout}
        />
        <Gap width={20} />
        <Text style={styles.textHeaderTitle}>CheckInEase</Text>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: 'black', fontStyle: 'italic'}}>
          Selamat datang,
        </Text>
        <Gap height={10} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="account-circle" color={'black'} size={60} />
          <Gap width={5} />
          <View>
            <Text style={styles.textUsername}>Nama User</Text>
            <Gap height={2.5} />
            <Text style={{color: 'grey', fontStyle: 'italic'}}>
              contoh@email.com
            </Text>
          </View>
        </View>
      </View>
      <Presence />
      <TouchableNativeFeedback useForeground>
        <View style={styles.btnScanQR}>
          <Icon name="qrcode-scan" color={'white'} size={30} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  btnScanQR: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 60 / 2,
    backgroundColor: '#D4CB00',
    elevation: 3,
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  textUsername: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
  },
  textHeaderTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 17,
  },
});
