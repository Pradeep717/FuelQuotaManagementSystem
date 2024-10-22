import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_URL } from '@env';

const OperatorsScreen = () => {
  const [operators, setOperators] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Added password field for operator creation
  const [phoneNumber, setPhoneNumber] = useState(''); // Added phone number field

  // Fetch operators and gas stations from backend
  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stations`);
      setOperators(response.data);
    } catch (error) {
      console.error('Error fetching operators:', error);
    }
  };

  const addOperator = async () => {
    if (!name || !email || !password || !phoneNumber) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      const newOperator = {
        name,
        email,
        password,
        phoneNumber,
      };
      await axios.post(`${API_URL}/api/stations/addStationOperator`, newOperator);
      setIsModalVisible(false);
      setName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      fetchOperators(); // Refresh the list
      Alert.alert('Success', 'Operator successfully added!');
    } catch (error) {
      console.error('Error adding operator:', error);
      Alert.alert('Error', 'Could not add operator. Please try again.');
    }
  };

  const searchOperators = () => {
    // return operators.filter((operator) => operator.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return operators;
  };

  const removeOperator = async (operatorId) => {
    try {
      await axios.delete(`${API_URL}/operators/${operatorId}`);
      fetchOperators(); // Refresh the list after deletion
      setSelectedOperator(null);
      Alert.alert('Success', 'Operator successfully removed!');
    } catch (error) {
      console.error('Error removing operator:', error);
      Alert.alert('Error', 'Could not remove operator. Please try again.');
    }
  };

  return (
    <View className="flex-1 p-4 pt-8">
      <Button title="Add Operator" onPress={() => setIsModalVisible(true)} />
      <TextInput className="border p-2 mb-4 mt-4" placeholder="Search by name..." value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={searchOperators()}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedOperator(item)} className="p-2 border-b">
            <View className="flex-row justify-between">
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal for adding a new operator */}
      <Modal visible={isModalVisible} transparent>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-4 rounded-lg w-3/4">
            <TextInput placeholder="Name" value={name} onChangeText={setName} className="border p-2 mb-2" />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} className="border p-2 mb-2" keyboardType="email-address" />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} className="border p-2 mb-2" secureTextEntry />
            <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} className="border p-2 mb-2" keyboardType="phone-pad" />

            <Button title="Add" onPress={addOperator} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>

      {/* Modal for viewing operator details */}
      <Modal visible={!!selectedOperator} transparent>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-4 rounded-lg w-3/4">
            {selectedOperator && (
              <>
                <Text>Name: {selectedOperator.name}</Text>
                <Text>Email: {selectedOperator.email}</Text>
                <Button title="Remove" onPress={() => removeOperator(selectedOperator.id)} color="red" />
                <Button title="Close" onPress={() => setSelectedOperator(null)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OperatorsScreen;
