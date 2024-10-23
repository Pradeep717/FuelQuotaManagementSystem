import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '@env';
import { useUser } from '../../../context/UserContext';

const ProfileScreen = () => {
  const { logoutUser, user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const handleSave = async () => {
    try {
      //This backend check thers is an error for operator update
      const response = await axios.put(`${API_URL}/api/users/update/${user._id}`, {
        name,
        email,
        phoneNumber,
      });

      updateUser(response.data.user);

      Alert.alert('Success', 'Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <View className="flex-1 justify-center p-10 bg-white">
      <View className="h-20 w-20 rounded-full bg-blue-500 justify-center items-center mb-2 self-center">
        <Text className="text-3xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</Text>
      </View>

      <View className="flex-row justify-end mb-4 pr-4">
        {/* {!isEditing && <Text className="text-xl">Edit </Text>} */}
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Ionicons name={isEditing ? 'close' : 'pencil'} size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {isEditing ? (
        <>
          <Text className="text-lg mb-1 text-gray-700">Name:</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Name" className="border border-gray-300 rounded p-2 mb-4 w-full" />

          <Text className="text-lg mb-1 text-gray-700">Email:</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" className="border border-gray-300 rounded p-2 mb-4 w-full" keyboardType="email-address" />

          <Text className="text-lg mb-1 text-gray-700">Phone Number:</Text>
          <TextInput value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" className="border border-gray-300 rounded p-2 mb-4 w-full" keyboardType="phone-pad" />

          <View className="flex-row justify-between w-full">
            <Button title="Save" onPress={handleSave} color="#4CAF50" />
            <Button title="Cancel" onPress={() => setIsEditing(false)} color="#f05a5b" />
          </View>
        </>
      ) : (
        <>
          <Text className="text-2xl font-bold mb-2 text-black text-center">{user.name}</Text>
          <Text className="text-lg mb-1 text-gray-700 text-center">Email: {user.email}</Text>
          <Text className="text-lg mb-1 text-gray-700 text-center">Phone: {user.phoneNumber}</Text>
        </>
      )}

      <View className="mt-20 bottom-5 w-full px-50">
        <TouchableOpacity onPress={logoutUser} className="bg-red-500 py-3 rounded-full" style={{ alignSelf: 'center', width: '60%' }}>
          <Text className="text-center text-white font-bold text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;