import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, useUser } from './context/UserContext';
import AuthNavigator from './navigation/AuthNavigator';
import VehicleOwnerTabs from './navigation/VehicleOwnerTabs';
import StationOwnerTabs from './navigation/StationOwnerTabs';
import OwnerTabs from './navigation/OwnerTabs';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { user } = useUser();

  if (!user) {
    return <AuthNavigator />;
  }

  // Navigate based on role
  return (
    <NavigationContainer>
      {user.role === 'vehicleOwner' && <VehicleOwnerTabs />}
      {user.role === 'stationOwner' && <StationOwnerTabs />}
      {user.role === 'owner' && <OwnerTabs />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <UserProvider>
      <MainNavigator />
    </UserProvider>
  );
}
