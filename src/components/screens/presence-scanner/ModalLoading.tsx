import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

export default function ModalLoading() {
  const {modal_loading} = useSelector(state => state.presence);
  return (
    <Modal visible={modal_loading} transparent animationType="fade">
      <View style={styles.container}>
        <Pressable style={styles.backdrop} />
        <View style={styles.viewLoading}>
          <ActivityIndicator color={'black'} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.25,
  },
  viewLoading: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
