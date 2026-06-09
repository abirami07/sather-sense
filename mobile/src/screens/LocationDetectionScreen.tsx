import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import ScreenContainer from '@components/layout/ScreenContainer';
import AccessibleText from '@components/ui/AccessibleText';
import PrimaryButton from '@components/ui/PrimaryButton';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { useCurrentLocation } from '@hooks/useCurrentLocation';

type Props = NativeStackScreenProps<RootStackParamList, 'LocationDetection'>;

/**
 * Location detection screen.
 *
 * In the MVP this does NOT use the real camera yet.
 * Instead we simulate capturing an image and running OCR.
 */
const LocationDetectionScreen: React.FC<Props> = ({ navigation }) => {
  const { currentNode, status, error, detectLocationFromImage } = useCurrentLocation();

  const handleCapture = async () => {
    await detectLocationFromImage();
  };

  const handleConfirm = () => {
    if (!currentNode) return;
    navigation.navigate('DestinationInput', { currentLocationNodeId: currentNode.id });
  };

  return (
    <ScreenContainer>
      <AccessibleText variant="heading">
        Identify My Location
      </AccessibleText>

      <AccessibleText variant="body" style={styles.description}>
        Point your camera at the nearest room number or sign and tap "Capture sign".
        (Simulated OCR in this MVP.)
      </AccessibleText>

      <View style={styles.cameraPlaceholder} accessible accessibilityLabel="Camera view placeholder">
        <AccessibleText variant="body">
          Camera preview would appear here.
        </AccessibleText>
      </View>

      <PrimaryButton
        label={status === 'detecting' ? 'Detecting...' : 'Capture sign'}
        onPress={handleCapture}
      />

      {status === 'detecting' && (
        <ActivityIndicator color={colors.primary} style={styles.spinner} />
      )}

      {currentNode && (
        <View style={styles.result}>
          <AccessibleText variant="subheading">
            Detected location:
          </AccessibleText>
          <AccessibleText variant="body">
            {currentNode.label}
          </AccessibleText>
          <PrimaryButton
            label="Use this location"
            onPress={handleConfirm}
          />
        </View>
      )}

      {error && (
        <AccessibleText variant="body" style={styles.error}>
          {error}
        </AccessibleText>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  description: {
    marginBottom: spacing.lg
  },
  cameraPlaceholder: {
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg
  },
  spinner: {
    marginVertical: spacing.sm
  },
  result: {
    marginTop: spacing.lg
  },
  error: {
    color: colors.danger,
    marginTop: spacing.md
  }
});

export default LocationDetectionScreen;

