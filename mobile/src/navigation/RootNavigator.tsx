import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import LocationDetectionScreen from '../screens/LocationDetectionScreen';
import DestinationInputScreen from '../screens/DestinationInputScreen';
import NavigationScreen from '../screens/NavigationScreen';
import ArrivalScreen from '../screens/ArrivalScreen';
import HapticKeyScreen from '../screens/HapticKeyScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Defines the navigation graph for the app.
 *
 * Each screen focuses on a single user task.
 */
const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="LocationDetection" component={LocationDetectionScreen} />
      <Stack.Screen name="DestinationInput" component={DestinationInputScreen} />
      <Stack.Screen name="Navigation" component={NavigationScreen} />
      <Stack.Screen name="Arrival" component={ArrivalScreen} />
      <Stack.Screen name="HapticKey" component={HapticKeyScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

