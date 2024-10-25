import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { API_URL } from '@env';
import { useUser } from '../../../context/UserContext';
import * as Progress from 'react-native-progress';
import HomeHeader from '../../../components/HomeHeader';
import AntDesign from '@expo/vector-icons/AntDesign';

const HomeScreen = () => {
  const { user } = useUser();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [quotaDetails, setQuotaDetails] = useState(null);
  const [literPumped, setLiterPumped] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    // Alert.alert('Scanned QR Code', `Type: ${type}\nData: ${data}`, [{ text: 'OK' }]);

    try {
      const response = await axios.post(
        `${API_URL}/api/fuel/check-quota`,
        { vehicleNumber: data },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setQuotaDetails(response.data);
        setLiterPumped(response.data.lastPumpedAmount || ''); // Assuming lastPumpedAmount is part of the response
        // Alert.alert('Quota Check', response.data.message || 'Quota details retrieved successfully.');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to check quota.');
      }
    } catch (error) {
      console.error('Error checking quota:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to check quota.');
    }
  };

  const handlePumpingSubmit = async () => {
    const liters = parseFloat(literPumped);
    if (quotaDetails && liters > quotaDetails.remainingQuota) {
      Alert.alert('Error', 'Pumped liters exceed the remaining quota.');
    } else {
      try {
        const response = await axios.post(
          `${API_URL}/api/fuel/register`,
          {
            vehicleNumber: scannedData,
            stationOperatorID: user._id,
            litresPumped: liters,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          Alert.alert('Success', 'Pumping data submitted successfully.');
          setScanned(false);
          setScannedData(null);
          setQuotaDetails(null);
          setLiterPumped('');
          setShowForm(false);
        } else {
          Alert.alert('Error', response.data.message || 'Failed to submit pumping data.');
        }
      } catch (error) {
        console.error('Error submitting pumping data:', error);
        Alert.alert('Error', error.response?.data?.message || 'Failed to submit pumping data.');
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg font-medium text-gray-700">Requesting camera permission...</Text>
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <HomeHeader />
          <View className="flex-1 justify-center items-center p-5 bg-white">
            {!scanned && (
              <Text className="text-2xl font-bold text-baseColor mb-4">
                Scan the QR Code <AntDesign name="qrcode" size={24} color="black" />
              </Text>
            )}

            {!scanned && (
              <View className="border border-indigo-300 rounded-lg overflow-hidden shadow-lg">
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ width: 350, height: 400 }} />
              </View>
            )}

            {scanned && quotaDetails && (
              <View className="mt-6 p-4 bg-gray-100 rounded-lg w-11/12 items-center">
                <Text className="text-xl mb-2 text-secondColor font-semibold">Quota Details:</Text>
                <Progress.Circle size={150} progress={quotaDetails.usedQuota / quotaDetails.allocatedQuota} showsText={false} color="gray" unfilledColor="#ff4b2b" borderWidth={10} style={{ borderRadius: 60 }} />
                <Text className="mt-2 text-gray-700 text-4xl">{`${Math.round((quotaDetails.usedQuota / quotaDetails.allocatedQuota) * 100)}%`}</Text>
                <Text className="mt-2 text-gray-700 text-xl">Remaining Quota: {quotaDetails.remainingQuota} L</Text>

                <TouchableOpacity
                  className="mt-4 bg-baseColor px-5 py-3 rounded-full"
                  onPress={() => {
                    setShowForm(true);
                  }}
                >
                  <Text className="text-white text-lg font-medium">Enter Liters to Pump</Text>
                </TouchableOpacity>
              </View>
            )}

            {showForm && quotaDetails && (
              <View className="mt-6 pt-4 bg-white rounded-lg w-11/12">
                <TextInput value={literPumped} onChangeText={setLiterPumped} keyboardType="numeric" placeholder="Enter liters to pump" className="border border-gray-300 h-[40px] rounded-xl mb-4 px-4 " />
                {parseFloat(literPumped) > quotaDetails.remainingQuota && <Text className="text-red-600">Entered liters exceed remaining quota!</Text>}
                <TouchableOpacity className={`mt-2  px-5 py-3 rounded-full ${parseFloat(literPumped) > quotaDetails.remainingQuota ? 'bg-gray-400' : 'bg-baseColor'}`} disabled={parseFloat(literPumped) > quotaDetails.remainingQuota} onPress={handlePumpingSubmit}>
                  <Text className="text-white text-lg font-medium text-center">Submit</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  className="mt-2 bg-indigo-600 px-5 py-3 rounded-full"
                  onPress={() => {
                    setScanned(false);
                    setShowForm(false);
                  }}
                >
                  <Text className="text-white text-lg font-medium">Tap to Scan Again</Text>
                </TouchableOpacity> */}
              </View>
            )}

            {!scanned && (
              <View className="mt-4 bg-gray-500 p-4 rounded-lg w-11/12">
                <Text className="text-lg text-white">Previous Vehicle: {scannedData || 'N/A'}</Text>
                <Text className="text-lg text-white">Last Entered Liters: {literPumped || 'N/A'} L</Text>
              </View>
            )}

            {scanned && (
              <View className="mt-6 rounded-lg w-11/12">
                {/* <Text className="text-lg text-indigo-800">Previous Vehicle: {scannedData}</Text>
                <Text className="text-lg text-indigo-800">Last Entered Liters: {literPumped} L</Text> */}
                <TouchableOpacity
                  className="mt-2 bg-gray-500 px-5 py-3 rounded-full border-[2px] border-baseColor"
                  onPress={() => {
                    setScanned(false);
                    setShowForm(false);
                  }}
                >
                  <Text className="text-white text-lg font-medium text-center">Tap to Scan Again</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
