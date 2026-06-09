import { Building, Floor, Node, Edge } from '@types/building';

const buildingId = 'dwinelle';

// Floor 1: entrance and a couple of nearby rooms/intersection.
const nodesFloor1: Node[] = [
  {
    id: 'dwinelle-entrance',
    buildingId,
    floorNumber: 1,
    coordinates: { x: 0, y: 0 },
    nodeType: 'hallway',
    label: 'Dwinelle Entrance'
  },
  {
    id: 'dwinelle-101',
    buildingId,
    floorNumber: 1,
    coordinates: { x: 4, y: 0 },
    nodeType: 'room',
    label: 'Room 101'
  },
  {
    id: 'dwinelle-intersection-a',
    buildingId,
    floorNumber: 1,
    coordinates: { x: 8, y: 0 },
    nodeType: 'intersection',
    label: 'Intersection A'
  }
];

const edgesFloor1: Edge[] = [
  {
    fromNodeId: 'dwinelle-entrance',
    toNodeId: 'dwinelle-101',
    distance: 4,
    accessible: true
  },
  {
    fromNodeId: 'dwinelle-101',
    toNodeId: 'dwinelle-intersection-a',
    distance: 4,
    accessible: true
  }
];

// Floor 2: a small corridor and two rooms.
const nodesFloor2: Node[] = [
  {
    id: 'dwinelle-stairs-2',
    buildingId,
    floorNumber: 2,
    coordinates: { x: 0, y: -2 },
    nodeType: 'stairs',
    label: 'Stairs from Floor 1'
  },
  {
    id: 'dwinelle-201',
    buildingId,
    floorNumber: 2,
    coordinates: { x: 4, y: 0 },
    nodeType: 'room',
    label: 'Room 201'
  },
  {
    id: 'dwinelle-202',
    buildingId,
    floorNumber: 2,
    coordinates: { x: 8, y: 0 },
    nodeType: 'room',
    label: 'Room 202'
  }
];

const edgesFloor2: Edge[] = [
  {
    fromNodeId: 'dwinelle-stairs-2',
    toNodeId: 'dwinelle-201',
    distance: 4,
    accessible: true
  },
  {
    fromNodeId: 'dwinelle-201',
    toNodeId: 'dwinelle-202',
    distance: 4,
    accessible: true
  }
];

// Floor 3: another corridor and a single room.
const nodesFloor3: Node[] = [
  {
    id: 'dwinelle-stairs-3',
    buildingId,
    floorNumber: 3,
    coordinates: { x: 0, y: -2 },
    nodeType: 'stairs',
    label: 'Stairs from Floor 2'
  },
  {
    id: 'dwinelle-301',
    buildingId,
    floorNumber: 3,
    coordinates: { x: 4, y: 0 },
    nodeType: 'room',
    label: 'Room 301'
  }
];

const edgesFloor3: Edge[] = [
  {
    fromNodeId: 'dwinelle-stairs-3',
    toNodeId: 'dwinelle-301',
    distance: 4,
    accessible: true
  }
];

// Floor 4: one more room off the stairs.
const nodesFloor4: Node[] = [
  {
    id: 'dwinelle-stairs-4',
    buildingId,
    floorNumber: 4,
    coordinates: { x: 0, y: -2 },
    nodeType: 'stairs',
    label: 'Stairs from Floor 3'
  },
  {
    id: 'dwinelle-401',
    buildingId,
    floorNumber: 4,
    coordinates: { x: 4, y: 0 },
    nodeType: 'room',
    label: 'Room 401'
  }
];

const edgesFloor4: Edge[] = [
  {
    fromNodeId: 'dwinelle-stairs-4',
    toNodeId: 'dwinelle-401',
    distance: 4,
    accessible: true
  }
];

// Connect the stairs between floors.
const stairsEdges: Edge[] = [
  {
    fromNodeId: 'dwinelle-intersection-a',
    toNodeId: 'dwinelle-stairs-2',
    distance: 3,
    accessible: false,
    floorTransition: 'stairs'
  },
  {
    fromNodeId: 'dwinelle-stairs-2',
    toNodeId: 'dwinelle-stairs-3',
    distance: 3,
    accessible: false,
    floorTransition: 'stairs'
  },
  {
    fromNodeId: 'dwinelle-stairs-3',
    toNodeId: 'dwinelle-stairs-4',
    distance: 3,
    accessible: false,
    floorTransition: 'stairs'
  }
];

const floor1: Floor = {
  buildingId,
  floorNumber: 1,
  nodes: nodesFloor1,
  edges: [...edgesFloor1, stairsEdges[0]]
};

const floor2: Floor = {
  buildingId,
  floorNumber: 2,
  nodes: nodesFloor2,
  edges: [
    ...edgesFloor2,
    stairsEdges[0],
    stairsEdges[1]
  ]
};

const floor3: Floor = {
  buildingId,
  floorNumber: 3,
  nodes: nodesFloor3,
  edges: [
    ...edgesFloor3,
    stairsEdges[1],
    stairsEdges[2]
  ]
};

const floor4: Floor = {
  buildingId,
  floorNumber: 4,
  nodes: nodesFloor4,
  edges: [
    ...edgesFloor4,
    stairsEdges[2]
  ]
};

export const dwinelleBuilding: Building = {
  id: buildingId,
  name: 'Dwinelle Hall',
  floors: [floor1, floor2, floor3, floor4]
};

