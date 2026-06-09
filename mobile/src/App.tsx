import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { AppThemeProvider } from './theme/AppThemeProvider';

/**
 * Root of the mobile application.
 *
 * This component only wires up:
 * - navigation
 * - theming
 *
 * The actual screen logic lives in the screens, hooks, and services folders.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}

