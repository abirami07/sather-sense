import React, { useEffect } from 'react';
import ScreenContainer from '@components/layout/ScreenContainer';
import AccessibleText from '@components/ui/AccessibleText';
import PrimaryButton from '@components/ui/PrimaryButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { useTextToSpeech } from '@hooks/useTextToSpeech';
import { useHaptics } from '@hooks/useHaptics';

type Props = NativeStackScreenProps<RootStackParamList, 'Arrival'>;

/**
 * Simple "Destination reached" screen.
 */
const ArrivalScreen: React.FC<Props> = ({ navigation }) => {
  const { speak } = useTextToSpeech();
  const { trigger } = useHaptics();

  useEffect(() => {
    trigger('destination');
    speak('You have reached your destination.');
  }, [speak, trigger]);

  return (
    <ScreenContainer>
      <AccessibleText variant="heading">
        Destination Reached
      </AccessibleText>
      <AccessibleText variant="body">
        You have arrived. If you need more assistance, ask someone nearby or return to the home screen.
      </AccessibleText>

      <PrimaryButton
        label="Back to home"
        onPress={() => navigation.navigate('Home')}
      />
    </ScreenContainer>
  );
};

export default ArrivalScreen;

