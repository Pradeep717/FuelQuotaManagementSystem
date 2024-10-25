import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { useUser } from '../../../context/UserContext';
import QRCode from 'react-native-qrcode-svg';
import HomeHeader from '../../../components/HomeHeader';
import { Image } from 'react-native';
import images from '../../../constants/images';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const { user } = useUser();
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Function to fetch the user's vehicles
  const fetchUserVehicles = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/vehicles/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setVehicles(response.data || []);
    } catch (error) {
      console.error('Error fetching user vehicles:', error);
      Alert.alert('Error', 'Failed to fetch vehicle list.');
    }
  };

  useEffect(() => {
    fetchUserVehicles(); // Fetch vehicles when the screen mounts
  }, []);

  const handleAddVehicle = async () => {
    if (!vehicleNumber) {
      Alert.alert('Error', 'Please enter the vehicle number.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/vehicles/register`,
        {
          vehicleNumber,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Vehicle added successfully!');
        // Refresh the vehicle list to include the newly registered vehicle
        fetchUserVehicles();

        // Clear input field
        setVehicleNumber('');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to add vehicle.');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      Alert.alert('Error', 'Failed to add vehicle.');
    }
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalVisible(true);
  };

  const renderVehicleItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectVehicle(item)} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-300">
      <Text className="text-lg font-medium">{item.vehicleNumber}</Text>
      <Text className="text-baseColor font-semibold">Type: {item.vehicleType}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <HomeHeader />

        <Image source={images.regVehicle} className="w-full h-[202px] " resizeMode="contain" />

        <View className="flex-1 pb-10 pt-6 px-4 bg-white">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-1 border px-4 rounded-2xl h-12">
              <TextInput className="flex-1" placeholder="Enter Vehicle Number to Add" value={vehicleNumber} onChangeText={setVehicleNumber} />
            </View>

            <TouchableOpacity onPress={handleAddVehicle} className="bg-red-500 p-3 rounded-full ml-2">
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="mt-4 text-xl">List of registered vehicles</Text>
          <View className="h-[1px] bg-gray-300 mt-1 mb-4" />

          <FlatList data={vehicles} keyExtractor={(item) => item._id} renderItem={renderVehicleItem} />

          {/* Modal to show vehicle details including QR code */}
          <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
            <View className="flex-1 justify-center items-center p-10 bg-white">
              {selectedVehicle && (
                <>
                  <Text className="text-2xl mb-4 text-baseColor font-semibold">Vehicle Details</Text>
                  <Text className="text-lg">Number: {selectedVehicle.vehicleNumber}</Text>
                  <View className="my-4 border rounded-lg p-4">
                    <QRCode value={selectedVehicle.vehicleNumber} size={300} />
                  </View>

                  <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-baseColor py-3 w-full mt-4 rounded-xl">
                    <Text className="text-center text-white font-bold text-lg">Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Modal>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
