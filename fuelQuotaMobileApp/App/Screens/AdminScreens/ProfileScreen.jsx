// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useUser } from '../../../context/UserContext';

const ProfileScreen = () => {
  const { logoutUser } = useUser();

  return (
    <View className="flex-1 justify-center items-center p-10">
      <Text className="text-2xl font-bold mb-4 text-black">Admin Profile Screen</Text>
      <Button title="Logout" onPress={logoutUser} />
    </View>
  );
};

export default ProfileScreen;
