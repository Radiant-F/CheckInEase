import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalMonthSelector from './ModalMonthSelector';
import {useFocusEffect} from '@react-navigation/native';

export default function Presence() {
  const {token} = useSelector(state => state.user);
  const [presence, setPresence]: any = useState();

  const [modalMonthVisible, setModalMonthVisible] = useState(false);
  const closeModalMonth = () => setModalMonthVisible(false);
  const openModalMonth = () => setModalMonthVisible(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const [loading, setLoading] = useState(false);
  async function getPresence() {
    setLoading(true);
    try {
      const {data} = await axios.get(
        'https://dev.pondokdigital.pondokqu.id/api/get-data-user-in-year',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPresence(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPresence();
    }, []),
  );

  function navigateMonth(type: 'next' | 'prev') {
    const current = new Date().getMonth(),
      canNext = selectedMonth != current,
      canPrev = selectedMonth != 0;
    if (type == 'next' && canNext) setSelectedMonth(selectedMonth + 1);
    else if (type == 'prev' && canPrev) setSelectedMonth(selectedMonth - 1);
    else return;
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.viewMonthNavigator}>
        <TouchableNativeFeedback
          useForeground
          onPress={() => navigateMonth('prev')}>
          <View style={styles.btnMonthNavigator}>
            <Icon name="chevron-left" color={'black'} size={30} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback useForeground onPress={openModalMonth}>
          <View style={styles.btnSelectedMonth}>
            <Text style={styles.textSelectedMonth}>
              {months[selectedMonth]}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          useForeground
          onPress={() => navigateMonth('next')}>
          <View style={styles.btnMonthNavigator}>
            <Icon name="chevron-right" color={'black'} size={30} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback useForeground onPress={openModalMonth}>
          <View style={styles.btnMonthSelector}>
            <Icon name="calendar-search" color={'black'} size={27.5} />
          </View>
        </TouchableNativeFeedback>
      </View>

      <View style={{height: 20}} />

      <ScrollView
        contentContainerStyle={styles.containerPresence}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getPresence} />
        }>
        {presence?.[months[selectedMonth]].map((item, index) => {
          const isIn = item.in != ' ' || item.in != null;
          const bgColor =
            item.statusPresence == 'Alpha' ? 'black' : 'dodgerblue';
          return (
            <View
              style={{...styles.viewPresence, backgroundColor: bgColor}}
              key={index}>
              <Text style={styles.textDateIndex}>{index + 1}</Text>
              {item.isReturn && (
                <Icon
                  name="bookmark-check-outline"
                  color={'white'}
                  size={15}
                  style={styles.iconCheckout}
                />
              )}
              <Text style={{color: 'white', textAlign: 'center'}}>
                {item.statusPresence}
              </Text>
              {isIn && (
                <Text style={styles.textClockIn}>{item.in?.slice(0, 5)}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>

      <ModalMonthSelector
        months={months}
        visible={modalMonthVisible}
        onPressClose={closeModalMonth}
        onSelect={monthIndex => {
          setSelectedMonth(monthIndex);
          closeModalMonth();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textClockIn: {
    position: 'absolute',
    bottom: 5,
    color: 'white',
    alignSelf: 'center',
    fontSize: 10,
  },
  iconCheckout: {
    position: 'absolute',
    top: 4,
    right: 5,
  },
  textDateIndex: {
    color: 'white',
    opacity: 0.75,
    position: 'absolute',
    top: 4,
    left: 5,
    fontSize: 11,
  },
  viewMonthNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btnSelectedMonth: {
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 3,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 110,
  },
  textSelectedMonth: {
    color: 'black',
    fontWeight: '500',
  },
  btnMonthSelector: {
    overflow: 'hidden',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'white',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnMonthNavigator: {
    overflow: 'hidden',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'white',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  containerPresence: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  viewPresence: {
    width: 65,
    height: 65,
    margin: 10,
    borderRadius: 5,
    elevation: 3,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
