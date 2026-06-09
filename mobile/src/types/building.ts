/**
 * Types of locations we can have in the building graph.
 */
export type NodeType =
  | 'room'
  | 'hallway'
  | 'elevator'
  | 'stairs'
  | 'intersection'
  | 'landmark'
  | 'entrance';

export interface Coordinates {
  x: number;
  y: number;
}

export interface Node {
  id: string;
  buildingId: string;
  floorNumber: number;
  coordinates: Coordinates;
  nodeType: NodeType;
  label: string;
}

export interface Edge {
  fromNodeId: string;
  toNodeId: string;
  distance: number;
  accessible: boolean;
  floorTransition?: 'stairs' | 'elevator';
}

export interface Floor {
  buildingId: string;
  floorNumber: number;
  nodes: Node[];
  edges: Edge[];
}

export interface Building {
  id: string;
  name: string;
  floors: Floor[];
}

