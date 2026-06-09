import { useCallback } from 'react';
import { getSpeechService } from '@services/speech/SpeechService';

/**
 * Simple hook that exposes a "speak" function using the shared speech service.
 */
export function useTextToSpeech() {
  const speak = useCallback(async (text: string) => {
    const service = getSpeechService();
    await service.speak(text);
  }, []);

  const stop = useCallback(() => {
    const service = getSpeechService();
    service.stop();
  }, []);

  return { speak, stop };
}

