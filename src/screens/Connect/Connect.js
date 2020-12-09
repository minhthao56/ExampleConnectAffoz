import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import SimpleToast from 'react-native-simple-toast';
import {WifiWizard} from 'react-native-wifi-and-hotspot-wizard';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

import {Button, OneWifi} from '../../components';
import {connectWifiNetwork} from '../../helpers/connectWifi';

export default function Connect({navigation}) {
  const [listWifi, setListWifi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [SSIDCurrent, setSSIDCurrent] = useState('');

  const permissionsAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Wifi networks',
          message: 'We need your permission in order to find wifi networks',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Thank you for your permission! :)');
      } else {
        console.log(
          'You will not able to retrieve wifi available networks list',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const currentSSID = () => {
    NetInfo.fetch('wifi').then(state => {
      setSSIDCurrent(state.details.ssid);
    });
  };

  const scanWifi = () => {
    setIsLoading(true);
    WifiWizard.getNearbyNetworks()
      .then(networks => {
        setListWifi(networks);
        setIsLoading(false);
        currentSSID();
      })
      .catch(err => {
        SimpleToast.show(err);
        setIsLoading(false);
      });
  };

  const handleDetailWifi = (SSID, capabilities) => {
    const network = listWifi.filter(item => {
      return item.SSID == SSID;
    });
    const password = '';
    SimpleToast.show(`Connecting to ${SSID}...`);
    connectWifiNetwork(network[0], SSID, password)
      .then(res => {
        setIsLoading(false);
        SimpleToast.show(`Connected to ${SSID}`);
        navigation.navigate('DetailConnect', {
          SSID: SSID,
          listWifi: listWifi,
          capabilities: capabilities,
        });
      })
      .catch(err => {
        SimpleToast.show(`Connect to ${SSID} is error. Please Try again !!!`);
      });
  };

  useEffect(() => {
    permissionsAndroid();
    scanWifi();
    currentSSID();
  }, []);

  return (
    <View style={Styles.full}>
      <View style={Styles.title}>
        <Icon name="share-2" type="feather" size={16} reverse />
        <Text style={Styles.text}>Danh sách wifi</Text>
      </View>
      <ScrollView style={Styles.constainer}>
        {isLoading ? (
          <Text>Đang tìm wifi...</Text>
        ) : (
          listWifi.map((item, i) => {
            return (
              <OneWifi
                item={item}
                key={i}
                handleDetailWifi={handleDetailWifi}
                isConnect={SSIDCurrent === item.SSID ? true : false}
                isPrivate={item.capabilities.includes('WPA')}
              />
            );
          })
        )}
      </ScrollView>
      <View style={Styles.button}>
        <Button onPress={() => scanWifi()}>Scan again</Button>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
  },
  constainer: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  full: {
    height: '100%',
  },
});

{
  /* <View>
            <ActivityIndicator size="large" color="#facd02" />
            {isTakeSerilNumber ? (
              <Text>Taking serialNumer...</Text>
            ) : (
              <Text>Connecting...</Text>
            )}
          </View> */
}
{
  /* <Overlay
Overlay
isVisible={modalVisible}
onBackdropPress={() => setModalVisible(false)}
overlayStyle={Styles.overlay}>



  <>
  
  </>

</Overlay> */
}
