import { View, Text, Button } from 'react-native';
import React from 'react';
import { useUser } from '../../../context/UserContext';

const ProfileScreen = () => {
  const { logoutUser } = useUser();
  return (
    <View className="flex-1 justify-center items-center p-10">
      <Text>Operators ProfileScreen</Text>
      <Button title="Logout" onPress={logoutUser} />
    </View>
  );
};

export default ProfileScreen;
