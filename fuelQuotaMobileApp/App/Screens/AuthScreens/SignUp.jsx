// src/screens/Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { useUser } from '../../../context/UserContext';
import CustomButton from '../../../components/CustomButton';

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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center bg-white p-4">
          {/* <Text className="text-2xl font-bold mb-4">Sign Up</Text> */}

          <View className="mb-10 w-3/4 items-center">
            <Text className="text-2xl mb-8">Select Role</Text>

            <View className="flex-row justify-around w-full ">
              <View className="items-center">
                <TouchableOpacity className={`border rounded-full w-10 h-10 items-center justify-center ${role === 'vehicle_owner' ? 'bg-baseColor' : 'bg-gray-100'}`} onPress={() => setRole('vehicle_owner')} />
                <Text className="text-xs mt-1 text-black">Vehicle Owner</Text>
              </View>

              <View className="items-center">
                <TouchableOpacity className={`border rounded-full w-10 h-10 items-center justify-center ${role === 'admin' ? 'bg-baseColor' : 'bg-gray-100'}`} onPress={() => setRole('admin')} />
                <Text className="text-xs mt-1 text-black">Admin</Text>
              </View>

              <View className="items-center">
                <TouchableOpacity className={`border rounded-full w-10 h-10 items-center justify-center ${role === 'station_owner' ? 'bg-baseColor' : 'bg-gray-100'}`} onPress={() => setRole('station_owner')} />
                <Text className="text-xs mt-1 text-black">Station Owner</Text>
              </View>
            </View>
          </View>

          <TextInput className="border h-10 rounded-lg w-11/12 p-2 mb-4" placeholder="Name" value={name} onChangeText={setName} />

          <TextInput className="border h-10 rounded-lg w-11/12 p-2 mb-4" placeholder="Email" value={email} onChangeText={setEmail} />

          <TextInput className="border h-10 rounded-lg w-11/12 p-2 mb-4" placeholder="PhoneNumber" value={phoneNumber} onChangeText={setPhoneNumber} />

          <TextInput className="border h-10 rounded-lg w-11/12 p-2 mb-4" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

          <CustomButton title="Sign Up" handlePress={handleSignup} />
          {/* <Button title="Sign Up" onPress={handleSignup} /> */}
          {/* <Button title="Go to Login" onPress={() => navigation.navigate('Login')} /> */}

          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-[#FF9001] mr-2 text-lg">Have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-[#FF9001] underline text-lg">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
