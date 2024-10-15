import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import HomeScreen from '../../Screens/AdminScreens/HomeScreen';
import ProfileScreen from '../../Screens/AdminScreens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AdminTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="aHome"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="aProfile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default AdminTabs;
