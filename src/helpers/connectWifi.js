import {WifiWizard} from 'react-native-wifi-and-hotspot-wizard';

export const connectWifiNetwork = (network, SSID, password) => {
  return new Promise(function(resolve, reject) {
    WifiWizard.connectToNetwork(network, SSID, password)
      .then(data => {
        if (data.status == 'connected') {
          resolve(data.status);
        } else {
          reject(data.status);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
