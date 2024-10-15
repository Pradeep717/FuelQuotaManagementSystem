import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';

const VehiclesScreen = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/vehicles`);
      setVehicles(response.data);
      setFilteredVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicles.filter((vehicle) => vehicle.vehicleNumber.toLowerCase().includes(text.toLowerCase()));
      setFilteredVehicles(filtered);
    }
  };

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalVisible(true);
  };

  const handleDeleteVehicle = async () => {
    if (!selectedVehicle) return;

    try {
      await axios.delete(`${API_URL}/api/vehicles/${selectedVehicle._id}`);
      Alert.alert('Success', 'Vehicle deleted successfully');
      setModalVisible(false);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      Alert.alert('Error', 'Failed to delete the vehicle');
    }
  };

  return (
    <View className="flex-1 p-4 pt-10">
      <TextInput placeholder="Search vehicles Number ..." value={searchTerm} onChangeText={handleSearch} className="border p-2 rounded mb-4" />

      <FlatList
        data={filteredVehicles}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleVehicleClick(item)} className="p-4 pt-2 border rounded mb-2">
            <Text className="font-bold text-lg"> {item.vehicleType}</Text>
            <Text>Vehicle Number: {item.vehicleNumber}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-opacity-50">
          <View className="bg-white p-8 rounded-lg w-8/12 max-h-3/4">
            {selectedVehicle && (
              <>
                <Text className="text-3xl font-semibold mb-4"> {selectedVehicle.vehicleType}</Text>
                <Text>Vehicle Number: {selectedVehicle.vehicleNumber}</Text>
                <Text>Fuel Type: {selectedVehicle.fuelType}</Text>
                <Text>Verified: {selectedVehicle.isVerified ? 'Yes' : 'No'}</Text>
                <Text>Owner: {selectedVehicle.vehicleOwner}</Text>

                <View className="flex-row justify-between mt-4">
                  <Button title="Delete" onPress={handleDeleteVehicle} color="red" />
                  <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VehiclesScreen;
