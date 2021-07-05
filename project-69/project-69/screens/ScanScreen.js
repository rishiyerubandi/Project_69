import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
constructor() {
  super();
  this.state = {
    hasCameraPermissions: null,
    scanned: false,
    scannedData: '',
    buttonState: 'normal',
  };
}
getCameraPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({
    hasCameraPermissions: status === 'granted',
    buttonState: 'clicked',
  });
};
handleBarcodeScanned = async ({ type, data }) => {
  this.setState({
    scanned: true,
    scannedData: data,
    buttonState: 'normal',
  });
};
render() {
  const hasCameraPermissions = this.state.hasCameraPermissions;
  const scanned = this.state.scanned;
  const buttonState = this.state.buttonState;
  if (buttonState === 'clicked' && hasCameraPermissions) {
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}
      />
    );
  } else if (buttonState === 'normal') {
    return (
      <View style={styles.container}>
        <Text style={styles.displayText}>
          {hasCameraPermissions === true
            ? this.state.scannedData
            : 'Request Camera Permission'}
        </Text>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={this.getCameraPermission}
          title = "Barcode Scanner">
          <Text style={styles.displayText}> Scan QR Code </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
scanButton: {
  padding: 10,
  margin: 10,
  backgroundColor: '#2196f3',
},
displayText: {
  fontSize: 15,
  textDecorationLine: 'underline',
},
});
