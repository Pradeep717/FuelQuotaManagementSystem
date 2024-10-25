import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import HomeScreen from '../../Screens/OperatorScreens/HomeScreen';
import ProfileScreen from '../../Screens/OperatorScreens/ProfileScreen';

const Tab = createBottomTabNavigator();

const OperatorTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#ff4b2b',
      tabBarInactiveTintColor: '#999',
    }}
  >
    <Tab.Screen
      name="vHome"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default OperatorTabs;
