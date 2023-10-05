import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableNativeFeedback,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {Camera} from 'react-native-vision-camera';
import {setCameraPermission} from '../../../redux/slice/presenceSlice';

export default function ModalMonthSelector() {
  const dispatch = useDispatch();
  const {camera_permission} = useSelector(state => state.presence);
  const [visible, setVisible] = useState(true);
  const closeModal = () => setVisible(false);

  async function checkCamPermission() {
    const permit = await Camera.requestCameraPermission();
    if (permit === 'authorized') {
      dispatch(setCameraPermission(true));
      setVisible(false);
      return;
    } else return dispatch(setCameraPermission(false));
  }

  useEffect(() => {
    checkCamPermission();
  }, []);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={closeModal}>
      <View style={styles.container}>
        <Pressable style={styles.backdrop} onPress={closeModal} />
        <View style={styles.viewModalContainer}>
          <View style={styles.viewLoading}>
            {camera_permission == null ? (
              <ActivityIndicator color={'black'} size={'small'} />
            ) : (
              <Icon name="alert-outline" color={'black'} size={25} />
            )}
          </View>
          <View style={{width: 12.5}} />
          <Text style={{flex: 1, color: 'black'}}>
            {camera_permission == false
              ? 'Izin kamera diperlukan'
              : 'Memeriksa perizinan...'}
          </Text>
          {camera_permission == false && (
            <TouchableNativeFeedback
              useForeground
              onPress={() => Linking.openSettings()}>
              <View style={styles.btnRefresh}>
                <Icon name="refresh" size={20} color={'black'} />
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  btnRefresh: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    overflow: 'hidden',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLoading: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModalContainer: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 20,
    elevation: 5,
    padding: 20,
    maxHeight: 400,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.25,
  },
});
