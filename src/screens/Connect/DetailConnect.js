import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {WifiWizard} from 'react-native-wifi-and-hotspot-wizard';
import NetInfo from '@react-native-community/netinfo';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

import {Button, Input} from '../../components';

export default function DetailConnect({route}) {
  const [password, setPassword] = useState('');
  const [myPassword, setMyPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [idAddress, setIdAddress] = useState('');
  const {SSID, listWifi} = route.params;
  const [chooseSSID, setChooseSSID] = useState(listWifi[0].SSID);

  const sendInfo = () => {
    console.log(idAddress, myPassword, chooseSSID);
    // axios
    //   .get(`http://${idAddress}/?id =${chooseSSID}&pass=${myPassword}`)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log('axios', err));

    const network = listWifi.filter(item => {
      return item.SSID == chooseSSID;
    });
    SimpleToast.show(`Connecting to ${SSID} again...`);
    WifiWizard.connectToNetwork(network[0], chooseSSID, myPassword)
      .then(data => {
        if (data.status == 'connected') {
          SimpleToast.show(`Connected to ${network[0].SSID}`);
          setModalVisible(false);
        } else {
          SimpleToast.show('Failed To Connect');
        }
      })
      .catch(err => {
        SimpleToast.show(err);
      });
  };

  const checkConnect = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        NetInfo.fetch('wifi').then(state => {
          setIdAddress(state.details.ipAddress);
          unsubscribe();
          setModalVisible();
        });
      }
    });
  };

  const connectWifi = () => {
    SimpleToast.show(`Finding wifi...`);
    WifiWizard.getNearbyNetworks().then(networks => {
      let network = networks.filter(network => {
        return network.SSID == SSID;
      });
      if (network.length < 1) {
        SimpleToast.show('network not found');
      } else {
        SimpleToast.show(`Connecting to ${SSID}...`);
        WifiWizard.connectToNetwork(network[0], SSID, password)
          .then(data => {
            if (data.status == 'connected') {
              SimpleToast.show(`Connected to ${network[0].SSID}`);
              checkConnect();
            } else {
              SimpleToast.show('Failed To Connect');
            }
          })
          .catch(err => {
            SimpleToast.show(err);
          });
      }
    });
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.name}>{SSID}</Text>
      <View style={Styles.input}>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <Button onPress={connectWifi}>Kết nối</Button>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <Text>Choose your wifi</Text>
            <Picker
              selectedValue={chooseSSID}
              style={{height: 50, width: '80%'}}
              onValueChange={(itemValue, itemIndex) =>
                setChooseSSID(itemValue)
              }>
              {listWifi.map((item, i) => {
                return (
                  <Picker.Item label={item.SSID} value={item.SSID} key={i} />
                );
              })}
            </Picker>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => setMyPassword(text)}
              value={myPassword}
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 5,
                width: '80%',
                height: 38,
              }}
            />
            <TouchableHighlight
              style={{
                width: 100,
                height: 38,
                backgroundColor: '#facd02',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                marginTop: 16,
              }}
              onPress={sendInfo}>
              <Text style={{textAlign: 'center'}}>Gửi</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
    height: '100%',
  },
  input: {
    marginTop: 8,
  },
  name: {
    marginTop: 16,
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
