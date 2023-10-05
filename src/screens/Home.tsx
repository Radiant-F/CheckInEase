import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';
import React from 'react';
import {Background, Gap, Presence, UserHeader} from '../components';
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

      <UserHeader />

      <Presence />

      <TouchableNativeFeedback
        useForeground
        onPress={() => navigation.navigate('PresenceScanner')}>
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
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
  },
  textHeaderTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 17,
  },
});
