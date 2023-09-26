import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ModalMonthSelector = {
  months: Array<any>;
  visible: boolean;
  onPressClose: () => void;
  onSelect: (monthIndex: number) => void;
};

export default function ModalMonthSelector({
  months = [],
  visible = true,
  onPressClose,
  onSelect,
}: ModalMonthSelector) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onPressClose}>
      <View style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onPressClose} />
        <View style={styles.viewModalContainer}>
          <View style={styles.viewHeader}>
            <Icon name="calendar-multiple" color={'black'} size={25} />
            <Text style={{color: 'black'}}>Pilih Bulan</Text>
            <Icon
              name="close-circle-outline"
              color={'black'}
              size={25}
              onPress={onPressClose}
            />
          </View>
          <View style={{height: 15}} />
          <FlatList
            data={months.slice(0, new Date().getMonth() + 1)}
            renderItem={({item, index}) => {
              return (
                <TouchableNativeFeedback
                  key={index}
                  useForeground
                  onPress={() => onSelect(index)}>
                  <View style={styles.btnMonth}>
                    <Text style={{color: 'black'}}>{item}</Text>
                  </View>
                </TouchableNativeFeedback>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  btnMonth: {
    overflow: 'hidden',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewModalContainer: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 20,
    elevation: 5,
    padding: 20,
    maxHeight: 400,
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
