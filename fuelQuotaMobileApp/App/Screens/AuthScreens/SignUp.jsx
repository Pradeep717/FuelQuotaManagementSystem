// src/screens/Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useUser } from '../../../context/UserContext';

const SignUp = ({ navigation }) => {
  const { signupUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('vehicle_owner');

  const handleSignup = () => {
    signupUser(name, email, password, role, phoneNumber);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-10">
      <Text className="text-2xl font-bold mb-4">Sign Up</Text>

      <View className="mb-4 w-3/4 items-center">
        <Text className="mb-2 text-sm">Select Role:</Text>

        <View className="flex-row justify-around w-full ">
          <View className="items-center">
            <TouchableOpacity className={`border rounded-full w-10 h-10 items-center justify-center ${role === 'vehicle_owner' ? 'bg-blue-500' : 'bg-gray-200'}`} onPress={() => setRole('vehicle_owner')} />
            <Text className="text-xs mt-1 text-black">Vehicle Owner</Text>
          </View>

          <View className="items-center">
            <TouchableOpacity className={`border rounded-full w-10 h-10 items-center justify-center ${role === 'admin' ? 'bg-blue-500' : 'bg-gray-200'}`} onPress={() => setRole('admin')} />
            <Text className="text-xs mt-1 text-black">Admin</Text>
          </View>

          <View className="items-center">
            <TouchableOpacity className={`border rounded-full w-10 h-10 items-center justify-center ${role === 'station_owner' ? 'bg-blue-500' : 'bg-gray-200'}`} onPress={() => setRole('station_owner')} />
            <Text className="text-xs mt-1 text-black">Station Owner</Text>
          </View>
        </View>
      </View>

      <TextInput className="border w-3/4 p-2 mb-4" placeholder="Name" value={name} onChangeText={setName} />

      <TextInput className="border w-3/4 p-2 mb-4" placeholder="Email" value={email} onChangeText={setEmail} />

      <TextInput className="border w-3/4 p-2 mb-4" placeholder="PhoneNumber" value={phoneNumber} onChangeText={setPhoneNumber} />

      <TextInput className="border w-3/4 p-2 mb-4" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignUp;
