import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, ToastAndroid} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setModalLoading} from '../../../redux/slice/presenceSlice';
import {useNavigation} from '@react-navigation/native';

export default function Scanner() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {token, user_data} = useSelector(state => state.user);
  const devices = useCameraDevices();
  const device = devices.back;
  const [active, setActive] = useState(true);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const showToast = (message: string) =>
    ToastAndroid.show(message, ToastAndroid.LONG);

  async function postPresence(barcodeValue?: string) {
    dispatch(setModalLoading(true));
    const endpoint = barcodeValue?.includes('saya-hadir')
      ? 'presence-in'
      : 'presence-out';
    try {
      const {data} = await axios.post(
        `https://dev.pondokdigital.pondokqu.id/api/${endpoint}`,
        {
          status: 'Hadir',
          latitude: 123123,
          longitude: 123123,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
      const username = user_data.name.toUpperCase();
      dispatch(setModalLoading(false));
      switch (data.message) {
        case `HAI ${username} ANDA BELUM PRESENSI MASUK, SILAHKAN PRESENSI MASUK TERLEBIH DAHULU`:
          showToast('Presensi masuk terlebih dahulu');
          setActive(true);
          return;
        case `TERIMA KASIH ${username} SUDAH PRESENSI HARI INI`:
          showToast('Terima kasih sudah presensi');
          return;
        case `${username} SUDAH PRESENSI HARI INI, CUKUP SEKALI AJA PRESENSINYA`:
          showToast('Anda sudah presensi');
          navigation.goBack();
          return;
        case `TERIMA KASIH ${username} SUDAH PRESENSI PULANG HARI INI`:
          showToast('Terima kasih sudah presensi pulang');
          navigation.goBack();
          return;
        case `${username} SUDAH PRESENSI PULANG HARI INI, CUKUP SEKALI AJA PRESENSINYA`:
          showToast('Anda sudah presensi pulang');
          navigation.goBack();
          return;
        default:
          showToast(data.message);
          return;
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        ToastAndroid.show(
          error.response.data.message.toString(),
          ToastAndroid.LONG,
        );
      }
    }
  }

  function validateBarcodes() {
    if (barcodes.length) {
      setActive(false);
      const {displayValue} = barcodes[0];
      if (
        displayValue?.includes('saya-hadir') ||
        displayValue?.includes('saya-pulang')
      )
        return postPresence(displayValue);
      else {
        ToastAndroid.show('Kode QR tidak dikenali', ToastAndroid.SHORT);
        setTimeout(() => {
          setActive(true);
        }, 2000);
      }
    }
  }

  useEffect(() => {
    validateBarcodes();
  }, [barcodes]);

  return (
    device != null && (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={active}
        frameProcessor={frameProcessor}
        frameProcessorFps={1}
      />
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
