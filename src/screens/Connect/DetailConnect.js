import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {WifiWizard} from 'react-native-wifi-and-hotspot-wizard';

import {Button, Input} from '../../components';

export default function DetailConnect({route}) {
  const [password, setPassword] = useState('');
  const {SSID} = route.params;

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
