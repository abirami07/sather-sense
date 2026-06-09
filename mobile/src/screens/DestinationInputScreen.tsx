import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import ScreenContainer from '@components/layout/ScreenContainer';
import AccessibleText from '@components/ui/AccessibleText';
import PrimaryButton from '@components/ui/PrimaryButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { spacing } from '@theme/spacing';
import { colors } from '@theme/colors';
import { wheelerBuilding } from '@data/index';
import { findNodeByText } from '@utils/matching';
import { useRoutePlanning } from '@hooks/useRoutePlanning';
import { useSpeechToText } from '@hooks/useSpeechToText';

type Props = NativeStackScreenProps<RootStackParamList, 'DestinationInput'>;

/**
 * Screen where the user can type or (simulated) speak their destination.
 */
const DestinationInputScreen: React.FC<Props> = ({ navigation, route }) => {
  const [destinationText, setDestinationText] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { route: plannedRoute, status, error, planRoute } = useRoutePlanning();
  const speech = useSpeechToText();

  const currentLocationNodeId = route.params?.currentLocationNodeId ?? 'wheeler-entrance';

  useEffect(() => {
    if (plannedRoute && status === 'done') {
      navigation.navigate('Navigation', { routeId: plannedRoute.id });
    }
  }, [plannedRoute, status, navigation]);

  const handlePlanRoute = () => {
    setStatusMessage(null);
    const building = wheelerBuilding;
    const node = findNodeByText(building, destinationText);
    if (!node) {
      setStatusMessage('Could not find a room matching that description.');
      return;
    }
    planRoute(currentLocationNodeId, node.id);
  };

  const handleSpeakDestination = async () => {
    await speech.startListening();
    if (speech.result) {
      setDestinationText(speech.result.text);
      setStatusMessage(`Heard: "${speech.result.text}"`);
    }
  };

  return (
    <ScreenContainer>
      <AccessibleText variant="heading">
        Choose Destination
      </AccessibleText>

      <AccessibleText variant="body" style={styles.subheading}>
        Type a room number (for example, "Room 202"), or use simulated speech input.
      </AccessibleText>

      <AccessibleText variant="subheading">
        Text destination
      </AccessibleText>
      <TextInput
        style={styles.input}
        placeholder="Example: Room 202"
        placeholderTextColor={colors.mutedText}
        value={destinationText}
        onChangeText={setDestinationText}
        accessible
        accessibilityLabel="Destination text input"
      />

      <PrimaryButton
        label={status === 'planning' ? 'Planning route...' : 'Plan route'}
        onPress={handlePlanRoute}
      />

      <AccessibleText variant="subheading" style={styles.sectionTitle}>
        Or use speech (simulated)
      </AccessibleText>

      <PrimaryButton
        label={speech.isListening ? 'Listening...' : 'Speak destination'}
        onPress={handleSpeakDestination}
      />

      {statusMessage && (
        <AccessibleText variant="body" style={styles.status}>
          {statusMessage}
        </AccessibleText>
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
  subheading: {
    marginBottom: spacing.lg
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    fontSize: 20,
    marginBottom: spacing.md
  },
  sectionTitle: {
    marginTop: spacing.lg
  },
  status: {
    marginTop: spacing.sm
  },
  error: {
    marginTop: spacing.sm,
    color: colors.danger
  }
});

export default DestinationInputScreen;

