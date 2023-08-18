import React from 'react';
import Navigation from './src/navigation/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
