import type { Building, Node, Edge } from '@types/building';

interface Graph {
  nodes: Map<string, Node>;
  adjacency: Map<string, Edge[]>;
}

/**
 * Builds a simple adjacency list from a building definition.
 */
export function buildGraph(building: Building): Graph {
  const nodes = new Map<string, Node>();
  const adjacency = new Map<string, Edge[]>();

  for (const floor of building.floors) {
    for (const node of floor.nodes) {
      nodes.set(node.id, node);
      adjacency.set(node.id, []);
    }
  }

  for (const floor of building.floors) {
    for (const edge of floor.edges) {
      if (!adjacency.has(edge.fromNodeId)) {
        adjacency.set(edge.fromNodeId, []);
      }
      adjacency.get(edge.fromNodeId)!.push(edge);
      // Make graph bidirectional for walking paths
      if (!adjacency.has(edge.toNodeId)) {
        adjacency.set(edge.toNodeId, []);
      }
      adjacency.get(edge.toNodeId)!.push({
        ...edge,
        fromNodeId: edge.toNodeId,
        toNodeId: edge.fromNodeId
      });
    }
  }

  return { nodes, adjacency };
}

/**
 * Simple Dijkstra shortest path implementation.
 * Returns a list of node IDs from start to end.
 */
export function dijkstraShortestPath(
  building: Building,
  startNodeId: string,
  endNodeId: string
): string[] | null {
  const { adjacency } = buildGraph(building);

  const distances = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const visited = new Set<string>();

  for (const nodeId of adjacency.keys()) {
    distances.set(nodeId, Infinity);
    prev.set(nodeId, null);
  }
  distances.set(startNodeId, 0);

  while (true) {
    let currentNodeId: string | null = null;
    let smallestDistance = Infinity;

    for (const [nodeId, distance] of distances.entries()) {
      if (!visited.has(nodeId) && distance < smallestDistance) {
        smallestDistance = distance;
        currentNodeId = nodeId;
      }
    }

    if (currentNodeId === null) {
      break;
    }

    if (currentNodeId === endNodeId) {
      break;
    }

    visited.add(currentNodeId);
    const neighbors = adjacency.get(currentNodeId) ?? [];

    for (const edge of neighbors) {
      const alt = distances.get(currentNodeId)! + edge.distance;
      const neighborId = edge.toNodeId;
      if (alt < (distances.get(neighborId) ?? Infinity)) {
        distances.set(neighborId, alt);
        prev.set(neighborId, currentNodeId);
      }
    }
  }

  if (!prev.has(endNodeId) || distances.get(endNodeId) === Infinity) {
    return null;
  }

  const path: string[] = [];
  let current: string | null = endNodeId;
  while (current) {
    path.unshift(current);
    current = prev.get(current) ?? null;
  }

  return path;
}

