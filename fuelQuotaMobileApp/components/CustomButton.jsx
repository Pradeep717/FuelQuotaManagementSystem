import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, isLoading, textStyles }) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`mt-4 bg-baseColor w-11/12 rounded-xl min-h-[52px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading}>
      <Text className={`text-white text-xl font-bold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
