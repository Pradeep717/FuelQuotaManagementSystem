import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { useUser } from '../../../context/UserContext'; // Assuming user details are accessible here
import QRCode from 'react-native-qrcode-svg';

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
      console.log(response.data);
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
    <TouchableOpacity onPress={() => handleSelectVehicle(item)} className="p-4 border-b border-gray-200">
      <Text className="text-lg">{item.vehicleNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-10 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">Vehicle Owner HomeScreen</Text>

      {/* Form to add a new vehicle */}
      <TextInput value={vehicleNumber} onChangeText={setVehicleNumber} placeholder="Enter Vehicle Number" className="border border-gray-300 rounded p-2 mb-4" />
      <Button title="Add Vehicle" onPress={handleAddVehicle} color="#007BFF" />

      {/* List of registered vehicles */}
      <FlatList data={vehicles} keyExtractor={(item) => item._id} renderItem={renderVehicleItem} className="mt-6" />

      {/* Modal to show vehicle details including QR code */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-center items-center p-10 bg-white">
          {selectedVehicle && (
            <>
              <Text className="text-2xl font-bold mb-4">Vehicle Details</Text>
              <Text className="text-lg">Number: {selectedVehicle.vehicleNumber}</Text>
              <View className="my-4">
                <QRCode value={selectedVehicle.vehicleNumber} size={200} />
              </View>
              <Button title="Close" onPress={() => setModalVisible(false)} color="#007BFF" />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
