import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ScreenContainer from '@components/layout/ScreenContainer';
import AccessibleText from '@components/ui/AccessibleText';
import PrimaryButton from '@components/ui/PrimaryButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { wheelerBuilding } from '@data/index';
import type { Route } from '@types/navigation';
import { buildRoute } from '@services/routing/instructionGenerator';
import { useTextToSpeech } from '@hooks/useTextToSpeech';
import { useHaptics } from '@hooks/useHaptics';

type Props = NativeStackScreenProps<RootStackParamList, 'Navigation'>;

/**
 * Simple navigation screen that steps through instructions one by one.
 *
 * For now we build a route again from the known route id.
 * In a more advanced app we would use a shared route store or context.
 */
const NavigationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { routeId } = route.params;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { speak } = useTextToSpeech();
  const { trigger } = useHaptics();

  // For this MVP we reconstruct the route using a fixed example.
  // Route id format: buildingId:startNodeId:endNodeId
  const currentRoute: Route | null = useMemo(() => {
    const [, startNodeId, endNodeId] = routeId.split(':');
    return buildRoute(wheelerBuilding, startNodeId, endNodeId);
  }, [routeId]);

  if (!currentRoute) {
    return (
      <ScreenContainer>
        <AccessibleText variant="heading">
          Navigation
        </AccessibleText>
        <AccessibleText variant="body">
          Could not load route.
        </AccessibleText>
      </ScreenContainer>
    );
  }

  const steps = currentRoute.steps;
  const currentStep = steps[currentStepIndex];

  const handleNext = async () => {
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      const nextStep = steps[nextIndex];
      await speak(nextStep.instruction);
      trigger(nextStep.hapticPattern);
    } else {
      // Reached the end of the route
      trigger('destination');
      navigation.navigate('Arrival', {
        destinationLabel: steps[steps.length - 1].toNodeId
      });
    }
  };

  const handleRepeat = async () => {
    await speak(currentStep.instruction);
    trigger(currentStep.hapticPattern);
  };

  const handleLost = async () => {
    await speak('If you feel lost, stay where you are and ask for help nearby.');
  };

  return (
    <ScreenContainer>
      <AccessibleText variant="heading">
        Navigation
      </AccessibleText>

      <AccessibleText variant="subheading" style={styles.label}>
        Current instruction
      </AccessibleText>

      <View style={styles.instructionBox}>
        <AccessibleText variant="body">
          {currentStep.instruction}
        </AccessibleText>
      </View>

      <PrimaryButton
        label="Next step"
        onPress={handleNext}
      />
      <PrimaryButton
        label="Repeat instruction"
        onPress={handleRepeat}
      />
      <PrimaryButton
        label="Lost?"
        onPress={handleLost}
      />

      <AccessibleText variant="subheading" style={styles.label}>
        Route overview
      </AccessibleText>

      <ScrollView style={styles.routePreview}>
        {steps.map((step) => (
          <AccessibleText key={step.id} variant="body" style={styles.stepText}>
            • {step.instruction}
          </AccessibleText>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm
  },
  instructionBox: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    minHeight: 80,
    justifyContent: 'center'
  },
  routePreview: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.surface,
    maxHeight: 180
  },
  stepText: {
    marginBottom: spacing.xs
  }
});

export default NavigationScreen;

