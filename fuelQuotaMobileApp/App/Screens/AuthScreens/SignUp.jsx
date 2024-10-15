// src/screens/Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { styled } from 'nativewind';

const StyledInput = styled(TextInput);

const SignUp = ({ navigation }) => {
  const { signupUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('author');

  const handleSignup = () => {
    signupUser(email, password, role);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-4">Sign Up</Text>
      <StyledInput className="border w-3/4 p-2 mb-4" placeholder="Email" value={email} onChangeText={setEmail} />
      <StyledInput className="border w-3/4 p-2 mb-4" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <View className="mb-4">
        <Button title="Author" onPress={() => setRole('author')} />
        <Button title="Vehicle Owner" onPress={() => setRole('vehicleOwner')} />
        <Button title="Station Owner" onPress={() => setRole('stationOwner')} />
      </View>
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignUp;
