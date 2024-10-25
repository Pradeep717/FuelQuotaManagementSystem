import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Button, Alert, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import AntDesign from '@expo/vector-icons/AntDesign';
import images from '../../../constants/images';

const OperatorsScreen = () => {
  const [operators, setOperators] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Fetch operators and gas stations from backend
  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stations/getAllStationOperators`);
      // console.log(response.data);
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
      fetchOperators();
      Alert.alert('Success', 'Operator successfully added!');
    } catch (error) {
      console.error('Error adding operator:', error);
      Alert.alert('Error', 'Could not add operator. Please try again.');
    }
  };

  const searchOperators = () => {
    return operators.filter((operator) => operator.name.toLowerCase().includes(searchQuery.toLowerCase()));
    // return operators;
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
    <View className="flex-1 bg-white">
      <Image source={images.gasOperators} className="w-full h-[320px] " resizeMode="contain" />

      <View className="mt-8 bottom-5 w-full">
        <TouchableOpacity onPress={() => setIsModalVisible(true)} className="bg-red-500 py-3 rounded-full mx-4">
          <Text className="text-center text-white font-bold text-lg">Add Operator</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-4 ">
        <View className="flex-row w-full items-center justify-between border px-2 mt-4 rounded-2xl mb-6 h-12">
          <TextInput className="flex-auto" placeholder="Search by name..." value={searchQuery} onChangeText={setSearchQuery} />
          <AntDesign name="search1" size={24} color="#ff4b2b" />
        </View>

        <View className="h-[1px] bg-black " />

        <FlatList
          data={searchOperators()}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedOperator(item)} className="p-2 border-b">
              <View className="flex-row justify-between ">
                <Text className="text-lg mt-2 mb-2">{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Modal for adding a new operator */}
        <Modal visible={isModalVisible} transparent>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-center items-center bg-black/50 px-4">
              <View className="bg-white py-8 px-2 rounded-lg w-full justify-center items-center">
                <TextInput className="border h-10  rounded-lg w-11/12 p-2 mb-4" placeholder="Name" value={name} onChangeText={setName} />
                <TextInput className="border h-10  rounded-lg w-11/12 p-2 mb-4" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <TextInput className="border h-10  rounded-lg w-11/12 p-2 mb-4" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <TextInput className="border h-10  rounded-lg w-11/12 p-2 mb-4" placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />

                <View className="mt-8 bottom-5 w-full">
                  <TouchableOpacity onPress={addOperator} className="bg-red-500 py-3 rounded-full mx-4">
                    <Text className="text-center text-white font-bold text-lg">Add</Text>
                  </TouchableOpacity>
                </View>
                <Button title="Cancel" onPress={() => setIsModalVisible(false)} color="red" />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Modal for viewing operator details */}
        <Modal visible={!!selectedOperator} transparent>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-4 rounded-lg w-10/12">
              {selectedOperator && (
                <>
                  <Text className="text-lg mb-2">Name: {selectedOperator.name}</Text>
                  <Text className="text-lg mb-2">Email: {selectedOperator.email}</Text>
                  <Button title="Remove" onPress={() => removeOperator(selectedOperator.id)} color="red" />
                  <Button title="Close" onPress={() => setSelectedOperator(null)} color={'gray'} />
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default OperatorsScreen;
