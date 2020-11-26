import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

export default function OneWifi({
  item,
  handleDetailWifi,
  isConnect,
  isPrivate,
}) {
  return (
    <TouchableOpacity
      style={Styles.oneWifi}
      onPress={() => handleDetailWifi(item.SSID)}>
      <Icon
        name="wifi"
        type="feather"
        color="#aaa"
        size={20}
        style={{marginRight: 8}}
      />
      <View>
        <Text>{item.SSID}</Text>
        {isConnect ? (
          <Text style={Styles.connect}>Connect</Text>
        ) : isPrivate ? (
          <Text style={Styles.connect}>Private</Text>
        ) : (
          <Text style={Styles.connect}>Public</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  oneWifi: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    borderColor: '#e1e1e1',
    marginBottom: 8,
  },
  connect: {
    fontSize: 10,
    fontWeight: '100',
    color: '#aaa',
  },
});
