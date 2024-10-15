import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// import AdminTabs from '../App/Navigations/AdminNavigations/AdminTabs';
// import VehicleOwnerTabs from '../App/Navigations/VehicleOwnerNavigations/VehicleOwnerTabs';
// import StationOwnerTabs from '../App/Navigations/StationOwnerNavigations/StationOwnerTabs';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigation = useNavigation();

  // console.log(navigation);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in
    const checkUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
        // navigateToRoleBasedScreen(JSON.parse(userData).role);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://192.168.1.31:5000/api/users/login', { email, password });
      const userData = response.data;

      // Store user data in AsyncStorage for persistence
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      // navigateToRoleBasedScreen(userData.role);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signupUser = async (name, email, password, role, phoneNumber) => {
    try {
      await axios.post('http://192.168.1.31:5000/api/users/signup', { name, email, password, role, phoneNumber });
      loginUser(email, password); // Automatically log the user in after signup
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    navigation.navigate('Login');
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Login' }], // Navigate back to the Login screen
    // });
  };

  // const navigateToRoleBasedScreen = (role) => {
  // if (role === 'vehicle_owner') {
  //   navigation.navigate('VehicleOwnerTabs');
  // } else if (role === 'station_owner') {
  //   navigation.navigate('StationOwnerTabs');
  // } else if (role === 'admin') {
  //   navigation.navigate('AdminTabs');
  // }
  // if (role === 'vehicle_owner') {
  //   navigation.navigate(VehicleOwnerTabs);
  // } else if (role === 'station_owner') {
  //   navigation.navigate(StationOwnerTabs);
  // } else if (role === 'admin') {
  //   navigation.navigate(AdminTabs);
  // }
  // };

  return <UserContext.Provider value={{ user, loginUser, signupUser, logoutUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
