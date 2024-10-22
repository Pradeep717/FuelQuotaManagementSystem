import { View, Text, Button } from 'react-native';
import React from 'react';
import { useUser } from '../../../context/UserContext';

const ProfileScreen = () => {
  const { logoutUser } = useUser();
  return (
    <View className="flex-1 justify-center items-center  p-10">
      <Text className="text-2xl font-bold mb-4 text-black">Station owner Profile Screen</Text>
      <Button title="Logout" onPress={logoutUser} />
    </View>
  );
};

export default ProfileScreen;
