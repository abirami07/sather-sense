import type { Building, Node } from '@types/building';
import { extractRoomNumber } from './textNormalization';

/**
 * Finds the node in the building that best matches the given text.
 * For the MVP we only handle simple room number matching.
 */
export function findNodeByText(building: Building, text: string): Node | null {
  const roomNumber = extractRoomNumber(text);
  if (!roomNumber) {
    return null;
  }

  const targetLabel = `Room ${roomNumber}`;

  for (const floor of building.floors) {
    for (const node of floor.nodes) {
      if (node.label.toLowerCase() === targetLabel.toLowerCase()) {
        return node;
      }
    }
  }

  return null;
}

