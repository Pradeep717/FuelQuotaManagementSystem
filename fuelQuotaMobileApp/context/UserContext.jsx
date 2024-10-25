import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';
import { Alert } from 'react-native';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigation = useNavigation();

  // console.log(navigation);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
      const userData = response.data;

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      Alert.alert('Login Error', 'Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  };

  const signupUser = async (name, email, password, role, phoneNumber) => {
    try {
      await axios.post(`${API_URL}/api/users/signup`, { name, email, password, role, phoneNumber });
      loginUser(email, password);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    navigation.navigate('Login');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return <UserContext.Provider value={{ user, loginUser, signupUser, logoutUser, updateUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
