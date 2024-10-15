import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import VehiclesScreen from '../../Screens/AdminScreens/VehiclesScreen';
import ProfileScreen from '../../Screens/AdminScreens/ProfileScreen';
import StationScreen from '../../Screens/AdminScreens/StationScreen';

const Tab = createBottomTabNavigator();

const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="vehicles"
      component={VehiclesScreen}
      options={{
        tabBarLabel: 'Vehicles',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="car" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="stations"
      component={StationScreen}
      options={{
        tabBarLabel: 'Stations',
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="fuel" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default AdminTabs;
