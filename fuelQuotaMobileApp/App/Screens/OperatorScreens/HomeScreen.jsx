import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    Alert.alert('Scanned QR Code', `Type: ${type}\nData: ${data}`, [{ text: 'OK', onPress: () => setScanned(false) }]);
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg font-medium text-gray-700">Requesting for camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg font-medium text-red-600">No access to camera</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-2xl font-bold text-indigo-600 mb-6"> Scan the QR Code</Text>

      {!scanned && (
        <View className="border border-indigo-300 rounded-lg overflow-hidden shadow-lg">
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ width: 350, height: 400 }} />
        </View>
      )}

      {scannedData && (
        <View className="mt-6 p-4 bg-indigo-100 rounded-lg w-11/12">
          <Text className="text-lg text-indigo-800">Scanned Data:</Text>
          <Text className="text-md text-gray-700 mt-1">{scannedData}</Text>
        </View>
      )}

      {scanned && (
        <TouchableOpacity className="mt-6 bg-indigo-600 px-5 py-3 rounded-full" onPress={() => setScanned(false)}>
          <Text className="text-white text-lg font-medium">Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeScreen;
