import { Text } from 'react-native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeNavigation from './HomeNavigation';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import SearchScreen from '../Screens/SearchScreen/SearchScreen';
import NotificationsScreen from '../Screens/NotificationsScreen/NotificationScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [notificationCount, setNotificationCount] = useState(3); // Initial notification count

  const handleNotificationPress = () => {
    setNotificationCount(0); // Reset count when a notification is pressed
  };

  // useEffect(() => {
  //   // Simulate receiving new notifications every 5 seconds
  //   const interval = setInterval(() => {
  //     setNotificationCount((prevCount) => prevCount + 1);
  //   }, 5000);

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#60B2FF',
        tabBarInactiveTintColor: '#8e8e93',
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeNavigation}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Home</Text>,
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Search</Text>,
          tabBarIcon: ({ color, size }) => <FontAwesome name="search" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Notifications"
        children={() => <NotificationsScreen onNotificationPress={handleNotificationPress} />}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Notifications</Text>,
          tabBarBadge: notificationCount > 0 ? notificationCount : null,
          tabBarIcon: ({ color, size }) => <FontAwesome name="bell-o" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Profile</Text>,
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
