import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Background, Gap} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native';
import {TouchableNativeFeedback} from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {setToken, setUserData} from '../redux/slice/userSlice';
import {Picker} from '@react-native-picker/picker';

export default function Register({navigation}: any) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Pria');
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('Staff');

  const [secureText, setSecureText] = useState(true);

  const instance = axios.create({
    baseURL: 'https://dev.pondokdigital.pondokqu.id/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const [loading, setLoading] = useState(false);
  async function submitForm() {
    setLoading(true);
    try {
      const {data: dataRegister} = await instance.post('/register', {
        name,
        gender,
        phone_number,
        email,
        password,
        division: selectedDivision,
        department: selectedDepartment,
        branch: selectedBranch,
        position,
        device_model: 'random4',
      });
      console.log('dataRegister', dataRegister);
      const {data: dataLogin} = await instance.post('/login', {
        email,
        password,
      });
      console.log('dataRegister', dataLogin);
      await EncryptedStorage.setItem(
        'user_credential',
        JSON.stringify({email, password}),
      );
      dispatch(setToken(dataLogin.token));
      dispatch(setUserData(dataLogin.user));
      setLoading(false);
      navigation.replace('Home');
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  }

  const [selectedDivision, setSelectedDivision] = useState(0);
  const [divisions, setDivisions] = useState([]);
  async function getDivisions() {
    try {
      const {data} = await instance.get('/getAllDivision');
      setDivisions(data);
      getDepartments(data[0].id);
    } catch (error) {
      console.log(error);
    }
  }

  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [departments, setDepartments] = useState([]);
  async function getDepartments(id: any) {
    try {
      const {data} = await instance.get(`/getDepartment/${id}`);
      if (data.data) return setDepartments([]);
      setDepartments(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [selectedBranch, setSelectedBranch] = useState(0);
  const [branches, setBranches] = useState([]);
  async function getBranches() {
    try {
      const {data} = await instance.get(`/branches`);
      setBranches(data);
      setSelectedBranch(data[0].id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDivisions();
    getBranches();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Background />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.textTitle}>Daftar</Text>

        <Gap height={25} />

        <Text style={{color: 'black', width: '85%'}}>Nama</Text>
        <View style={styles.viewInput}>
          <Icon name="account" color={'black'} size={25} />
          <TextInput
            placeholder="Masukan Nama..."
            placeholderTextColor={'grey'}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="words"
          />
        </View>

        <Gap height={15} />

        <Text style={{color: 'black', width: '85%'}}>Pilih Gender</Text>
        <View style={styles.viewInput}>
          <Icon name="gender-male-female" color={'black'} size={25} />
          <Picker
            style={styles.picker}
            selectedValue={gender}
            onValueChange={gender => setGender(gender)}
            dropdownIconColor={'black'}
            mode="dropdown">
            <Picker.Item value={'Pria'} label="Pria" />
            <Picker.Item value={'Wanita'} label="Wanita" />
          </Picker>
        </View>

        <Gap height={15} />

        <Text style={{color: 'black', width: '85%'}}>Nomor Telepon</Text>
        <View style={styles.viewInput}>
          <Icon name="phone" color={'black'} size={25} />
          <TextInput
            placeholder="08123456789"
            placeholderTextColor={'grey'}
            onChangeText={setPhone_number}
            style={styles.input}
            keyboardType="number-pad"
          />
        </View>

        <Gap height={15} />

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

        <Gap height={15} />

        <Text style={{color: 'black', width: '85%'}}>Pilih Divisi</Text>
        <View style={styles.viewInput}>
          <Icon name="office-building" color={'black'} size={25} />
          <Picker
            style={styles.picker}
            selectedValue={selectedDivision}
            onValueChange={divisionId => {
              setSelectedDivision(divisionId);
              getDepartments(divisionId);
            }}
            dropdownIconColor={'black'}>
            {divisions.map(v => (
              <Picker.Item label={v?.name} value={v.id} key={v.id} />
            ))}
          </Picker>
        </View>

        <Gap height={15} />

        <Text style={{color: 'black', width: '85%'}}>Pilih Departemen</Text>
        <View style={styles.viewInput}>
          <Icon name="domain" color={'black'} size={25} />
          <Picker
            style={styles.picker}
            selectedValue={selectedDepartment}
            onValueChange={departmentId => setSelectedDepartment(departmentId)}
            dropdownIconColor={'black'}>
            {departments.map(v => (
              <Picker.Item label={v.name} value={v.id} key={v.id} />
            ))}
          </Picker>
        </View>

        <Gap height={15} />

        <Text style={{color: 'black', width: '85%'}}>Pilih Cabang</Text>
        <View style={styles.viewInput}>
          <Icon name="source-branch" color={'black'} size={25} />
          <Picker
            style={styles.picker}
            selectedValue={selectedBranch}
            onValueChange={branchId => setSelectedBranch(branchId)}
            dropdownIconColor={'black'}>
            {branches.map(v => (
              <Picker.Item label={v.name} value={v.id} key={v.id} />
            ))}
          </Picker>
        </View>

        <Gap height={15} />

        <Text style={{color: 'black', width: '85%'}}>Pilih Jabatan</Text>
        <View style={styles.viewInput}>
          <Icon name="card-account-details-outline" color={'black'} size={25} />
          <Picker
            style={styles.picker}
            selectedValue={position}
            onValueChange={position => setPosition(position)}
            dropdownIconColor={'black'}>
            <Picker.Item label={'Staff'} value={'Staff'} />
            <Picker.Item label={'Supervisor'} value={'Supervisor'} />
            <Picker.Item label={'Manager'} value={'Manager'} />
          </Picker>
        </View>

        <Gap height={25} />
        <TouchableNativeFeedback useForeground onPress={submitForm}>
          <View style={styles.btnSubmit}>
            {loading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={styles.textSubmit}>Daftar</Text>
            )}
          </View>
        </TouchableNativeFeedback>
        <Gap height={10} />
        <TouchableNativeFeedback
          useForeground
          onPress={() => navigation.goBack()}>
          <View
            style={{
              ...styles.btnSubmit,
              backgroundColor: '#3ADE00',
              width: 150,
            }}>
            <Text style={styles.textSubmit}>Kembali</Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    color: 'black',
  },
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
    paddingVertical: 50,
  },
});
