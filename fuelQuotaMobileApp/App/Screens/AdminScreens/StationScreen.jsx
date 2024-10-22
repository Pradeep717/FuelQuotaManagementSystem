import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';

const StationScreen = () => {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stations`);
      setStations(response.data);
      setFilteredStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredStations(stations);
    } else {
      const filtered = stations.filter((station) => station.stationName.toLowerCase().includes(text.toLowerCase()));
      setFilteredStations(filtered);
    }
  };

  const handleStationClick = (station) => {
    setSelectedStation(station);
    setModalVisible(true);
  };

  const handleDeleteStation = async () => {
    if (!selectedStation) return;

    try {
      await axios.delete(`${API_URL}/api/stations/deleteStation/${selectedStation.id}`);
      Alert.alert('Success', 'Station deleted successfully');
      setModalVisible(false);
      setSelectedStation(null);
      fetchStations();
    } catch (error) {
      console.error('Error deleting station:', error);
      Alert.alert('Error', 'Failed to delete the station');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStation(null);
  };

  return (
    <View className="flex-1 p-4 pt-10">
      <TextInput placeholder="Search stations Name ..." value={searchTerm} onChangeText={handleSearch} className="border p-2 rounded mb-4" />

      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleStationClick(item)} className="p-4 pt-2 border rounded mb-2">
            <Text className="font-bold text-lg"> {item.stationName}</Text>
            <Text>Location: {item.location}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-opacity-50">
          <View className="bg-white p-8 rounded-lg w-8/12 max-h-3/4">
            {selectedStation && (
              <>
                <Text className="text-3xl font-semibold mb-4">{selectedStation.stationName}</Text>
                <Text>Location: {selectedStation.location}</Text>
                <Text>Station_regNumber: {selectedStation.station_regNumber}</Text>
                <Text>Station Owner: {selectedStation.fuelStationOwner.name}</Text>

                {selectedStation.registeredVehicles && selectedStation.registeredVehicles.length > 0 ? (
                  <>
                    <Text className="font-bold mt-4">Registered Vehicles:</Text>
                    <FlatList
                      data={selectedStation.registeredVehicles}
                      keyExtractor={(item) => item._id.toString()}
                      renderItem={({ item }) => (
                        <View className="border-b border-gray-300 py-2">
                          <Text>Vehicle ID: {item.vehicle.vehicleNumber}</Text>
                          <Text>Vehicle: {item.vehicle.vehicleType}</Text>
                          <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
                        </View>
                      )}
                      style={{ maxHeight: 200 }}
                    />
                  </>
                ) : (
                  <Text className="mt-4">No registered vehicles </Text>
                )}

                <View className="flex-row justify-between mt-4">
                  <Button title="Delete" onPress={handleDeleteStation} color="red" />
                  <Button title="Close" onPress={closeModal} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StationScreen;
