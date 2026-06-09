export type HapticPatternType = 'left' | 'right' | 'destination' | 'none';

export interface RouteStep {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  instruction: string;
  hapticPattern: HapticPatternType;
}

export interface Route {
  id: string;
  buildingId: string;
  steps: RouteStep[];
  totalDistance: number;
}

