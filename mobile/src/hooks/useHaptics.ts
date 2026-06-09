import { useCallback } from 'react';
import { triggerHapticPattern } from '@services/haptics/HapticsService';
import type { HapticPatternType } from '@types/navigation';

/**
 * Hook for triggering named haptic patterns.
 */
export function useHaptics() {
  const trigger = useCallback((pattern: HapticPatternType) => {
    triggerHapticPattern(pattern);
  }, []);

  return { trigger };
}

