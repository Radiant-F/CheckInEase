import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ModalLoading, ModalPermission, Scanner} from '../components';

export default function PresenceScanner() {
  return (
    <View style={{flex: 1}}>
      <ModalPermission />
      <Scanner />
      <ModalLoading />
    </View>
  );
}

const styles = StyleSheet.create({});
