import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenContainer from '@components/layout/ScreenContainer';
import AccessibleText from '@components/ui/AccessibleText';
import PrimaryButton from '@components/ui/PrimaryButton';
import { spacing } from '@theme/spacing';
import { useTextToSpeech } from '@hooks/useTextToSpeech';
import { hapticPatternDescriptions } from '@services/haptics/patterns';

/**
 * Explains the meaning of each vibration pattern.
 */
const HapticKeyScreen: React.FC = () => {
  const { speak } = useTextToSpeech();

  const handleReadAloud = async () => {
    const message = [
      hapticPatternDescriptions.right,
      hapticPatternDescriptions.left,
      hapticPatternDescriptions.destination
    ].join(' ');
    await speak(message);
  };

  return (
    <ScreenContainer>
      <AccessibleText variant="heading">
        Haptic Key
      </AccessibleText>

      <AccessibleText variant="body" style={styles.paragraph}>
        This app uses vibration patterns to help guide you:
      </AccessibleText>

      <View style={styles.listItem}>
        <AccessibleText variant="body">
          • {hapticPatternDescriptions.right}
        </AccessibleText>
      </View>
      <View style={styles.listItem}>
        <AccessibleText variant="body">
          • {hapticPatternDescriptions.left}
        </AccessibleText>
      </View>
      <View style={styles.listItem}>
        <AccessibleText variant="body">
          • {hapticPatternDescriptions.destination}
        </AccessibleText>
      </View>

      <PrimaryButton
        label="Read aloud"
        onPress={handleReadAloud}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: spacing.md
  },
  listItem: {
    marginBottom: spacing.sm
  }
});

export default HapticKeyScreen;

