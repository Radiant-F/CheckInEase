import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

export default function UserHeader() {
  const {name, email} = useSelector(state => state.user.user_data);
  return (
    <View style={{padding: 20}}>
      <Text style={{color: 'black', fontStyle: 'italic'}}>Selamat datang,</Text>
      <View style={{height: 10}} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="account-circle" color={'black'} size={60} />
        <View style={{width: 5}} />
        <View>
          <Text style={styles.textUsername}>{name}</Text>
          <View style={{width: 2.5}} />
          <Text style={{color: 'grey', fontStyle: 'italic'}}>{email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textUsername: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
});
