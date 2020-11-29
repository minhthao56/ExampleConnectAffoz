import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Overlay} from 'react-native-elements';

import {Button, Input} from '../../components';
import {connectWifiNetwork} from '../../helpers/connectWifi';
import {controllerApi} from '../../services';

export default function DetailConnect({route}) {
  const [password, setPassword] = useState('');
  const [myPassword, setMyPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {SSID, listWifi, capabilities} = route.params;
  const [chooseSSID, setChooseSSID] = useState(listWifi[0].SSID);
  const [isLoading, setIsLoading] = useState(false);
  const [isTakeSerilNumber, setIsTakeSerilNumber] = useState(false);

  const sendInfo = () => {
    setIsLoading(true);
    setIsTakeSerilNumber(true);
    axios
      .get(`http://192.168.4.1/?id =${chooseSSID}&pass=${myPassword}`)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(serialNumber => {
        const network = listWifi.filter(item => {
          return item.SSID == chooseSSID;
        });

        SimpleToast.show(`Connecting to ${SSID} again...`);
        connectWifiNetwork(network[0], chooseSSID, myPassword)
          .then(res => {
            SimpleToast.show(`Connected to ${network[0].SSID}`);
            SimpleToast.show(`Linking Sky to user...`);
            controllerApi
              .attachController({serialNumber: serialNumber})
              .then(res => {
                Toast.show({
                  type: 'success',
                  position: 'top',
                  text1: 'Link Sky to user success',
                  text2:
                    'Link Sky to user success, please check list sky again',
                  visibilityTime: 4000,
                  autoHide: true,
                  topOffset: 10,
                  bottomOffset: 40,
                });
                setModalVisible(false);
                setIsLoading(false);
                setIsTakeSerilNumber(false);
              })
              .then(err => {
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: "Can't link Sky to user",
                  text2: 'Please try linking Sky again...',
                  visibilityTime: 4000,
                  autoHide: true,
                  topOffset: 10,
                  bottomOffset: 40,
                });
              });
          })
          .catch(err => {
            SimpleToast.show('Failed To Connect');
          });
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: "Can't Take SerialNumber",
          text2: "Can't take serialNumber. Please try again...",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 10,
          bottomOffset: 40,
        });
        setModalVisible(false);
        setIsLoading(false);
        setIsTakeSerilNumber(false);
      });
  };

  const connectWifi = () => {
    const network = listWifi.filter(item => {
      return item.SSID == SSID;
    });
    setModalVisible(true);
    setIsLoading(true);
    SimpleToast.show(`Connecting to ${SSID}...`);
    connectWifiNetwork(network[0], SSID, password)
      .then(res => {
        setIsLoading(false);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Connected',
          text2: 'Connected success!!!',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 10,
          bottomOffset: 40,
        });
      })
      .catch(err => {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Connected Fail',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 10,
          bottomOffset: 40,
        });
      });
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.name}>{SSID}</Text>
      {capabilities.includes('WPA') && (
        <View style={Styles.input}>
          <Input
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
      )}

      <Button onPress={connectWifi}>Kết nối</Button>
      <Overlay
        Overlay
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        overlayStyle={Styles.overlay}>
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#facd02" />
            {isTakeSerilNumber ? (
              <Text>Taking serialNumer...</Text>
            ) : (
              <Text>Connecting...</Text>
            )}
          </View>
        ) : (
          <>
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
          </>
        )}
      </Overlay>
      <Toast ref={ref => Toast.setRef(ref)} />
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
  overlay: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
