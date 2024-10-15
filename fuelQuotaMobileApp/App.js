// App.js
import React from 'react';
import MainNavigation from './App/Navigations/AuthNavigations/MainNavigation';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <MainNavigation />
    </UserProvider>
  );
}
