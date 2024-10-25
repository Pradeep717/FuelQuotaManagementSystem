// src/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { useUser } from '../../../context/UserContext';
import images from '../../../constants/images';
import CustomButton from '../../../components/CustomButton';

const Login = ({ navigation }) => {
  // console.log('log navigation', navigation);
  const { loginUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    loginUser(email, password);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center bg-white pt-8 p-2">
          <Image source={images.logo} className="w-[320px] h-[320px] mb-12" resizeMode="contain" />

          <View className={` w-full justify-center items-center rounded-t-[50px]`}>
            <TextInput className="border h-10 rounded-lg w-11/12 p-2 mb-4  text-black border-gray-600" placeholder="Email" placeholderTextColor="#aaa" value={email} onChangeText={setEmail} />
            <TextInput className="border h-10 rounded-lg w-11/12 p-2 mb-4 text-black border-gray-600" placeholder="Password" placeholderTextColor="#aaa" value={password} onChangeText={setPassword} secureTextEntry />
            <CustomButton title="Login" handlePress={handleLogin} />
            {/* <Button title="Login" onPress={handleLogin} /> */}

            <View className="flex-row items-center justify-center mt-6 mb-10">
              <Text className="text-[#FF9001] mr-2 text-lg">Create account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text className="text-[#FF9001] underline text-lg">Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
