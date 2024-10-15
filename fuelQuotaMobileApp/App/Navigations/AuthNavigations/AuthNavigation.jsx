import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../Screens/AuthScreens/Login';
import SignUp from '../../Screens/AuthScreens/SignUp';
// import VehicleOwnerTabs from '../VehicleOwnerNavigations/VehicleOwnerTabs';
// import StationOwnerTabs from '../StationOwnerNavigations/StationOwnerTabs';
// import AdminTabs from '../AdminNavigations/AdminTabs';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={SignUp} />

    {/* <Stack.Screen name="VehicleOwnerTabs" component={VehicleOwnerTabs} />
    <Stack.Screen name="StationOwnerTabs" component={StationOwnerTabs} />
    <Stack.Screen name="AdminTabs" component={AdminTabs} /> */}
  </Stack.Navigator>
);

export default AuthNavigation;
