// src/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useUser } from '../../../context/UserContext';

const Login = ({ navigation }) => {
  // console.log('log navigation', navigation);
  const { loginUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    loginUser(email, password);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-10">
      <Text className="text-2xl font-bold mb-4 text-black">Login</Text>
      <TextInput className="border w-3/4 p-2 mb-4 text-black border-gray-600" placeholder="Email" placeholderTextColor="#aaa" value={email} onChangeText={setEmail} />
      <TextInput className="border w-3/4 p-2 mb-4 text-black border-gray-600" placeholder="Password" placeholderTextColor="#aaa" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

export default Login;
