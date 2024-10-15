// App.js
import React from 'react';
import MainNavigation from './App/Navigations/AuthNavigations/MainNavigation';
import { UserProvider } from './context/UserContext';
import Login from './App/Screens/AuthScreens/Login';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <MainNavigation />
      </UserProvider>
    </NavigationContainer>
  );
}
