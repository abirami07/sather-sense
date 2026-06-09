import * as Haptics from 'expo-haptics';
import type { HapticPatternType } from '@types/navigation';

/**
 * Wrapper around Expo Haptics with simple named patterns.
 */
export async function triggerHapticPattern(type: HapticPatternType): Promise<void> {
  switch (type) {
    case 'right':
      // Short buzz
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'left':
      // Long buzz (simulate with two medium impacts)
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'destination':
      // Double buzz
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case 'none':
    default:
      break;
  }
}

