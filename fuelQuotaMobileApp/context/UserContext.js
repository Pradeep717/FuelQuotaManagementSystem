import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in
    const checkUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
        navigateToRoleBasedScreen(JSON.parse(userData).role);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const userData = response.data;

      // Store user data in AsyncStorage for persistence
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigateToRoleBasedScreen(userData.role);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signupUser = async (email, password, role) => {
    try {
      await axios.post('http://localhost:5000/api/users/signup', { email, password, role });
      loginUser(email, password); // Automatically log the user in after signup
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    navigation.navigate('Auth');
  };

  const navigateToRoleBasedScreen = (role) => {
    if (role === 'vehicleOwner') {
      navigation.navigate('VehicleOwnerTabs');
    } else if (role === 'stationOwner') {
      navigation.navigate('StationOwnerTabs');
    } else if (role === 'author') {
      navigation.navigate('AuthorTabs');
    }
  };

  return <UserContext.Provider value={{ user, loginUser, signupUser, logoutUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
