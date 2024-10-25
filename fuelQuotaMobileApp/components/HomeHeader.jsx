import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const HomeHeader = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  const profileNavigate = () => {
    navigation.navigate('Profile'); // Adjust this to match your Profile screen's name
  };

  return (
    <View className="pt-8 pb-4 bg-gray-500 rounded-b-[5px]">
      <View className="flex-row items-center justify-between px-4">
        <TouchableOpacity className="flex-row items-center space-x-2" onPress={profileNavigate}>
          <View className="w-14 h-14 bg-baseColor rounded-full justify-center items-center">
            <Text className="text-white text-2xl font-bold">{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</Text>
          </View>
          <View>
            <Text className="text-white">Welcome,</Text>
            <Text className="text-white text-[20px]">{user?.name || 'User'}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="mr-4">
          <FontAwesome name="bookmark-o" size={27} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
