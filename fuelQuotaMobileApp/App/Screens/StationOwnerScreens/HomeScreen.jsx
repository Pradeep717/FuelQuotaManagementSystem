import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { useUser } from '../../../context/UserContext';
import HomeHeader from '../../../components/HomeHeader';

const HomeScreen = () => {
  const { user } = useUser();
  const [stationName, setStationName] = useState('');
  const [location, setLocation] = useState('');
  const [stationRegNumber, setStationRegNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [stationDetails, setStationDetails] = useState(null);

  // Function to fetch the station details
  const fetchStationDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stations/getAllStaionsByUserId`);
      if (response.data.length > 0) {
        setStationDetails(response.data[0]); // Only store the first station if it exists
        setIsRegistered(true);
      }
    } catch (error) {
      console.error('Error fetching station details:', error);
    }
  };

  useEffect(() => {
    fetchStationDetails(); // Fetch station details when the component mounts
  }, []);

  const handleRegister = async () => {
    if (!stationName || !location || !stationRegNumber) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/stations/registerStation`,
        {
          stationName,
          location,
          station_regNumber: stationRegNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Station registered successfully!');
        fetchStationDetails(); // Refresh to show the registered station details
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error registering station:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to register station.');
    }
  };

  return (
    <View className="flex-1 justify-center bg-white">
      <HomeHeader />
      <View className="flex-1 justify-center px-4 bg-white">
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
          <>
            <View className="items-center pt-8 ">
              <View className="bg-gray-500 p-4 rounded-lg shadow mb-4 w-full ">
                <Text className="text-2xl font-semibold mb-2 text-baseColor">Station Details</Text>
                <View className="h-[1px] bg-gray-300 mb-4" />
                <Text className="text-white text-base mb-1">Station Name: {stationDetails?.stationName}</Text>
                <Text className="text-white text-base mb-1">Location: {stationDetails?.location}</Text>
                <Text className="text-white text-base mb-1">Reg. Number: {stationDetails?.station_regNumber}</Text>
                <Text className="text-white text-base">Created At: {new Date(stationDetails?.createdAt).toLocaleDateString()}</Text>
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-lg font-semibold mt-4 mb-2">Fuel Pumped Vehicles</Text>
              <View className="h-[1px] bg-gray-300 mb-4" />

              <ScrollView className="flex-1">
                {stationDetails?.registeredVehicles?.length > 0 ? (
                  stationDetails.registeredVehicles.map((vehicle, index) => (
                    <View key={vehicle._id} className="bg-white border border-gray-300 rounded-lg p-4 mb-2 shadow">
                      <Text className="text-base font-medium">Vehicle ID: {vehicle.vehicle.vehicleNumber}</Text>
                      {/* <Text className="text-base">Owner: {vehicle.vehicle.ownerName}</Text> */}
                      <Text className="text-base">Vehicle Type: {vehicle.vehicle.vehicleType}</Text>
                      <Text className="text-base">Last Refueled: {new Date(vehicle.date).toLocaleDateString()}</Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-base">No Fuel-Up Records found.</Text>
                )}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
