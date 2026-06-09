import type { Building, Node } from '@types/building';
import type { Route, RouteStep } from '@types/navigation';
import { dijkstraShortestPath } from './graphAlgorithms';

/**
 * Converts a path of node IDs into simple route steps.
 * For the MVP we generate very plain instructions.
 */
function buildRouteSteps(building: Building, path: string[]): RouteStep[] {
  const nodesById = new Map<string, Node>();
  for (const floor of building.floors) {
    for (const node of floor.nodes) {
      nodesById.set(node.id, node);
    }
  }

  const steps: RouteStep[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const from = nodesById.get(path[i]);
    const to = nodesById.get(path[i + 1]);
    if (!from || !to) continue;

    let instruction = `Walk from ${from.label} to ${to.label}.`;
    let hapticPattern: RouteStep['hapticPattern'] = 'none';

    if (from.floorNumber !== to.floorNumber) {
      instruction = `Move from floor ${from.floorNumber} to floor ${to.floorNumber} via ${to.nodeType}.`;
      hapticPattern = 'none';
    } else if (to.nodeType === 'room') {
      instruction = `Walk to ${to.label}.`;
      hapticPattern = 'destination';
    }

    steps.push({
      id: `${from.id}->${to.id}`,
      fromNodeId: from.id,
      toNodeId: to.id,
      instruction,
      hapticPattern
    });
  }

  return steps;
}

export function buildRoute(
  building: Building,
  startNodeId: string,
  endNodeId: string
): Route | null {
  const path = dijkstraShortestPath(building, startNodeId, endNodeId);
  if (!path) {
    return null;
  }

  const steps = buildRouteSteps(building, path);
  const totalDistance = steps.length;

  return {
    id: `${building.id}:${startNodeId}:${endNodeId}`,
    buildingId: building.id,
    steps,
    totalDistance
  };
}

