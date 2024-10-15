// src/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useUser } from '../../../context/UserContext';

import { styled } from 'nativewind';

const StyledInput = styled(TextInput);

const Login = ({ navigation }) => {
  const { loginUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    loginUser(email, password);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <StyledInput className="border w-3/4 p-2 mb-4" placeholder="Email" value={email} onChangeText={setEmail} />
      <StyledInput className="border w-3/4 p-2 mb-4" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

export default Login;
