import type { HapticPatternType } from '@types/navigation';

/**
 * Text definitions used both in the app UI and when
 * reading the haptic key aloud.
 */
export const hapticPatternDescriptions: Record<HapticPatternType, string> = {
  right: 'Short vibration means turn right.',
  left: 'Long vibration means turn left.',
  destination: 'Double vibration means you have reached your destination.',
  none: 'No special vibration.'
};

