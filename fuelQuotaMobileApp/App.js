import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import AuthNavigation from './App/Navigations/AuthNavigation';

export default function App() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_dHJ1c3RlZC1naG9zdC04Ni5jbGVyay5hY2NvdW50cy5kZXYk">
      <SignedIn>
        <StatusBar style="dark" />
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      </SignedOut>
    </ClerkProvider>
  );
}

const tokenCache = {
  async saveToken(key, value) {
    let res = await SecureStore.setItemAsync(key, value);
    return res;
  },

  async getToken(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
      // alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      // alert('No values stored under that key.');
      console.log('No values stored under that key.');
    }
  },
};
