import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, Button, Alert, Image } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import HomeHeader from '../../../components/HomeHeader';
import AntDesign from '@expo/vector-icons/AntDesign';
import images from '../../../constants/images';

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
    <View className="flex-1">
      <HomeHeader />
      <Image source={images.moreVehicle} className="w-full h-[220px] " resizeMode="contain" />

      <View className="p-4 flex-1 bg-white">
        <View className="flex-row items-center justify-between border p-2 rounded-2xl mb-4 h-12">
          <TextInput className="flex-auto" placeholder="Search vehicles Number ..." value={searchTerm} onChangeText={handleSearch} />
          <AntDesign name="search1" size={24} color="#ff4b2b" />
        </View>

        <FlatList
          data={filteredVehicles}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleVehicleClick(item)} className="p-4 pt-2 border rounded-xl mb-2">
              <Text className="font-bold text-lg"> {item.vehicleType}</Text>
              <Text>Vehicle Number: {item.vehicleNumber}</Text>
            </TouchableOpacity>
          )}
        />

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View className="flex-1 justify-center items-center bg-opacity-250 ">
            <View className="bg-white p-8 border border-gray-200 shadow rounded-lg w-8/12 max-h-3/4">
              {selectedVehicle && (
                <>
                  <Text className="text-3xl font-semibold mb-4"> {selectedVehicle.vehicleType}</Text>
                  <View className="h-[1px] bg-gray-300 mb-4" />
                  <Text className="mb-2">Vehicle Number: {selectedVehicle.vehicleNumber}</Text>
                  <Text className="mb-2">Fuel Type: {selectedVehicle.fuelType}</Text>
                  <Text className="mb-2">Verified: {selectedVehicle.isVerified ? 'Yes' : 'No'}</Text>
                  <Text className="mb-2">Owner: {selectedVehicle.vehicleOwnerName}</Text>

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
    </View>
  );
};

export default VehiclesScreen;
