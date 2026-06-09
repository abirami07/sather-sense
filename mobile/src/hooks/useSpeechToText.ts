import { useState } from 'react';
import { getSpeechService } from '@services/speech/SpeechService';
import type { SpeechRecognitionResult } from '@types/speech';

/**
 * Simulated speech-to-text hook.
 *
 * This uses a fake recognition method so the UI can be tested
 * without any native speech integration.
 */
export function useSpeechToText() {
  const [result, setResult] = useState<SpeechRecognitionResult | null>(null);
  const [isListening, setIsListening] = useState(false);

  async function startListening() {
    setIsListening(true);
    const service = getSpeechService();
    const recognition = await service.recognizeOnceSimulated();
    setResult(recognition);
    setIsListening(false);
  }

  return {
    result,
    isListening,
    startListening
  };
}

