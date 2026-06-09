import * as ExpoSpeech from 'expo-speech';
import type { SpeechRecognitionResult } from '@types/speech';

/**
 * Text-to-speech and (simulated) speech-to-text service.
 *
 * - Text-to-speech uses Expo's built-in speech API.
 * - Speech-to-text is simulated in the MVP so we don't
 *   need native integrations yet.
 */
export interface SpeechService {
  speak(text: string): Promise<void>;
  stop(): void;
  recognizeOnceSimulated(): Promise<SpeechRecognitionResult>;
}

class ExpoSpeechService implements SpeechService {
  async speak(text: string): Promise<void> {
    return new Promise((resolve) => {
      ExpoSpeech.speak(text, {
        language: 'en-US',
        onDone: resolve,
        onStopped: resolve,
        onError: resolve
      });
    });
  }

  stop(): void {
    ExpoSpeech.stop();
  }

  async recognizeOnceSimulated(): Promise<SpeechRecognitionResult> {
    // In a real implementation you would integrate with a
    // speech-to-text provider here.
    // We return a fixed phrase so users can test the flow.
    return {
      text: 'Take me to room 202'
    };
  }
}

const speechService: SpeechService = new ExpoSpeechService();

export function getSpeechService(): SpeechService {
  return speechService;
}

