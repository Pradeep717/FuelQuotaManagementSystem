import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { useUser } from '../../../context/UserContext';

const HomeScreen = () => {
  const { user } = useUser(); // Assuming user info is accessible here
  const [stationName, setStationName] = useState('');
  const [location, setLocation] = useState('');
  const [stationRegNumber, setStationRegNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    if (!stationName || !location || !stationRegNumber) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      // Send data to the correct backend API route
      const response = await axios.post(
        `${API_URL}/api/stations/registerStation`,
        {
          stationName,
          location,
          station_regNumber: stationRegNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Assuming user token is needed for authorization
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Station registered successfully!');
        setIsRegistered(true);
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error registering station:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to register station.');
    }
  };

  return (
    <View className="flex-1 justify-center p-10 bg-white">
      {/* <Text className="text-2xl font-bold mb-6 text-center">
        Station Owner HomeScreen
      </Text> */}

      {!isRegistered ? (
        <>
          <Text className="text-lg mb-2">Station Name:</Text>
          <TextInput value={stationName} onChangeText={setStationName} placeholder="Enter Station Name" className="border border-gray-300 rounded p-2 mb-4" />

          <Text className="text-lg mb-2">Location:</Text>
          <TextInput value={location} onChangeText={setLocation} placeholder="Enter Location" className="border border-gray-300 rounded p-2 mb-4" />

          <Text className="text-lg mb-2">Station Registration Number:</Text>
          <TextInput value={stationRegNumber} onChangeText={setStationRegNumber} placeholder="Enter Registration Number" className="border border-gray-300 rounded p-2 mb-4" />

          <Button title="Register Station" onPress={handleRegister} color="#007BFF" />
        </>
      ) : (
        <View className="justify-center items-center">
          <Text className="text-2xl font-semibold mb-4">Station Registered Successfully!</Text>
          <Text className="text-base">Station Name: {stationName}</Text>
          <Text className="text-base">Location: {location}</Text>
          <Text className="text-base">Reg. Number: {stationRegNumber}</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
