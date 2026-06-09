import { Building, Floor, Node, Edge } from '@types/building';

/**
 * Very small, hand-crafted graph for Wheeler Hall.
 * This is enough to demonstrate routing in the MVP.
 */

const buildingId = 'wheeler';

const nodesFloor1: Node[] = [
  {
    id: 'wheeler-entrance',
    buildingId,
    floorNumber: 1,
    coordinates: { x: 0, y: 0 },
    nodeType: 'entrance',
    label: 'Wheeler Entrance'
  },
  {
    id: 'wheeler-101',
    buildingId,
    floorNumber: 1,
    coordinates: { x: 5, y: 0 },
    nodeType: 'room',
    label: 'Room 101'
  },
  {
    id: 'wheeler-102',
    buildingId,
    floorNumber: 1,
    coordinates: { x: 10, y: 0 },
    nodeType: 'room',
    label: 'Room 102'
  },
  {
    id: 'wheeler-hallway-1',
    buildingId,
    floorNumber: 1,
    coordinates: { x: 5, y: -2 },
    nodeType: 'hallway',
    label: 'Main Hallway'
  },
  {
    id: 'wheeler-stairs-1',
    buildingId,
    floorNumber: 1,
    coordinates: { x: 8, y: -2 },
    nodeType: 'stairs',
    label: 'Stairs to Floor 2'
  }
];

const nodesFloor2: Node[] = [
  {
    id: 'wheeler-stairs-2',
    buildingId,
    floorNumber: 2,
    coordinates: { x: 8, y: -2 },
    nodeType: 'stairs',
    label: 'Stairs from Floor 1'
  },
  {
    id: 'wheeler-201',
    buildingId,
    floorNumber: 2,
    coordinates: { x: 10, y: 0 },
    nodeType: 'room',
    label: 'Room 201'
  },
  {
    id: 'wheeler-202',
    buildingId,
    floorNumber: 2,
    coordinates: { x: 14, y: 0 },
    nodeType: 'room',
    label: 'Room 202'
  }
];

const edgesFloor1: Edge[] = [
  {
    fromNodeId: 'wheeler-entrance',
    toNodeId: 'wheeler-101',
    distance: 5,
    accessible: true
  },
  {
    fromNodeId: 'wheeler-101',
    toNodeId: 'wheeler-102',
    distance: 5,
    accessible: true
  },
  {
    fromNodeId: 'wheeler-101',
    toNodeId: 'wheeler-hallway-1',
    distance: 2,
    accessible: true
  },
  {
    fromNodeId: 'wheeler-hallway-1',
    toNodeId: 'wheeler-stairs-1',
    distance: 3,
    accessible: true,
    floorTransition: 'stairs'
  }
];

const edgesFloor2: Edge[] = [
  {
    fromNodeId: 'wheeler-stairs-2',
    toNodeId: 'wheeler-201',
    distance: 3,
    accessible: true
  },
  {
    fromNodeId: 'wheeler-201',
    toNodeId: 'wheeler-202',
    distance: 4,
    accessible: true
  }
];

const stairsConnection: Edge = {
  fromNodeId: 'wheeler-stairs-1',
  toNodeId: 'wheeler-stairs-2',
  distance: 3,
  accessible: false,
  floorTransition: 'stairs'
};

const floor1: Floor = {
  buildingId,
  floorNumber: 1,
  nodes: nodesFloor1,
  edges: [...edgesFloor1, stairsConnection]
};

const floor2: Floor = {
  buildingId,
  floorNumber: 2,
  nodes: nodesFloor2,
  edges: [
    ...edgesFloor2,
    {
      // reverse stair connection for bidirectional graph
      fromNodeId: 'wheeler-stairs-2',
      toNodeId: 'wheeler-stairs-1',
      distance: stairsConnection.distance,
      accessible: stairsConnection.accessible,
      floorTransition: stairsConnection.floorTransition
    }
  ]
};

export const wheelerBuilding: Building = {
  id: buildingId,
  name: 'Wheeler Hall',
  floors: [floor1, floor2]
};

