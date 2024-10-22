import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import HomeScreen from '../../Screens/StationOwnerScreens/HomeScreen';
import ProfileScreen from '../../Screens/StationOwnerScreens/ProfileScreen';
import OperatorsScreen from '../../Screens/StationOwnerScreens/OperatorsScreen';

const Tab = createBottomTabNavigator();

const StationOwnerTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="sHome"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="operators"
      component={OperatorsScreen}
      options={{
        tabBarLabel: 'Operators',
        tabBarIcon: ({ color, size }) => <FontAwesome6 name="people-group" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="sProfile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default StationOwnerTabs;
