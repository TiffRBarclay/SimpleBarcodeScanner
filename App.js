import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getPermissionsAsync = async () => {
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status === 'granted');
    }

    getPermissionsAsync();
  }, []);

  if(hasCameraPermission === null) {
    return <Text style={{marginTop: 20}}>Requestion for camera permission</Text>
  }
  if(hasCameraPermission === false) {
    return <Text style={{marginTop: 20}}>No access to camera</Text>
  }

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned`);
  }

  return (
    <View style={{
      flex:1,
      flexDirection:'column',
      justifyContent: "flex-end",
    }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={'Tap to scan again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
