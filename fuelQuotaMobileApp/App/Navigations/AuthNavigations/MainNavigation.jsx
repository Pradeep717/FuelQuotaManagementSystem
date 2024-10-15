// src/navigation/MainNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import VehicleOwnerTabs from '../VehicleOwnerNavigations/VehicleOwnerTabs';
import StationOwnerTabs from '../StationOwnerNavigations/StationOwnerTabs';
import AdminTabs from '../AdminNavigations/AdminTabs';
import { useUser } from '../../../context/UserContext';

const MainNavigation = () => {
  const { user } = useUser();

  return <>{user ? user.role === 'vehicle_owner' ? <VehicleOwnerTabs /> : user.role === 'station_owner' ? <StationOwnerTabs /> : <AdminTabs /> : <AuthNavigation />}</>;
};

export default MainNavigation;
