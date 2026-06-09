import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenContainer from '@components/layout/ScreenContainer';
import AccessibleText from '@components/ui/AccessibleText';
import PrimaryButton from '@components/ui/PrimaryButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { spacing } from '@theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

/**
 * Home screen with three main actions:
 * - Identify My Location
 * - Speak Destination
 * - Help (Haptic key)
 */
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <AccessibleText variant="heading">
        Indoor Navigation
      </AccessibleText>
      <AccessibleText variant="body" style={styles.subtitle}>
        For visually impaired users at UC Berkeley.
      </AccessibleText>

      <View style={styles.buttons}>
        <PrimaryButton
          label="Identify My Location"
          onPress={() => navigation.navigate('LocationDetection')}
        />
        <PrimaryButton
          label="Speak Destination"
          onPress={() => navigation.navigate('DestinationInput')}
        />
        <PrimaryButton
          label="Haptic Key / Help"
          onPress={() => navigation.navigate('HapticKey')}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: spacing.xl
  },
  buttons: {
    marginTop: spacing.lg
  }
});

export default HomeScreen;

