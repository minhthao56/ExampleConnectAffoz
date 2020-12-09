import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';

import {connectWifiNetwork} from '../../helpers/connectWifi';
import {controllerApi} from '../../services';

export default function DetailConnect({route, navigation}) {
  const [myPassword, setMyPassword] = useState('');
  const {SSID, listWifi, capabilities} = route.params;
  const [chooseSSID, setChooseSSID] = useState(listWifi[0].SSID);

  const sendInfo = () => {
    SimpleToast.show(`Taking serial number....`);
    axios
      .get(`http://192.168.4.1/?id =${chooseSSID}&pass=${myPassword}`)
      .then(res => {
        if (res.data) {
          return res.data;
        } else {
          SimpleToast.show(`Password wifi is wrong!!!`);
          return;
        }
      })
      .then(serialNumber => {
        if (!serialNumber) {
          return;
        }
        console.log('serialNumber', serialNumber);
        const network = listWifi.filter(item => {
          return item.SSID == chooseSSID;
        });
        SimpleToast.show(`Connecting to ${SSID} again...`);
        connectWifiNetwork(network[0], chooseSSID, myPassword)
          .then(res => {
            SimpleToast.show(`Connected to ${network[0].SSID}`);
            SimpleToast.show(`Linking Sky to user...`);

            const unsubscribe = NetInfo.addEventListener(state => {
              console.log(state.isConnected);
              if (state.isConnected) {
                controllerApi
                  .attachController({serialNumber: serialNumber.toString()})
                  .then(res => {
                    console.log(res);
                    SimpleToast.show(
                      'Link Sky to user success. Please Check list Sky again',
                    );
                    unsubscribe();
                    navigation.navigate('Connect');
                  })
                  .catch(err => {
                    console.log('error sky', JSON.stringify(err));
                    if (err.message === 'Network Error') {
                      SimpleToast.show('Network Error, please try again');
                    } else {
                      SimpleToast.show(
                        `Your Sky is connectd to orther user or not exist. Please try again!!`,
                        10,
                      );
                    }

                    unsubscribe();
                    navigation.navigate('Connect');
                  });
              }
            });
          })
          .catch(err => {
            SimpleToast.show('Failed To Connect');
          });
      })
      .catch(err => {
        SimpleToast.show("Can't take serialNumber. Please try again...");
      });
  };

  return (
    <View style={Styles.container}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <Text>Choose your wifi</Text>
      <Picker
        selectedValue={chooseSSID}
        style={{height: 50, width: '80%'}}
        onValueChange={(itemValue, itemIndex) => setChooseSSID(itemValue)}>
        {listWifi.map((item, i) => {
          return <Picker.Item label={item.SSID} value={item.SSID} key={i} />;
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
          width: '100%',
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
        <Text style={{textAlign: 'center'}}>Connect</Text>
      </TouchableHighlight>
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
});
