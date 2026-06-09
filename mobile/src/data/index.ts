import { wheelerBuilding } from './buildings/wheelerGraph';
import { dwinelleBuilding } from './buildings/dwinelleGraph';
import type { Building } from '@types/building';

/**
 * Registry of all buildings known to the app.
 */
const buildings: Record<string, Building> = {
  [wheelerBuilding.id]: wheelerBuilding,
  [dwinelleBuilding.id]: dwinelleBuilding
};

export function getBuildingById(id: string): Building | undefined {
  return buildings[id];
}

export function getAllBuildings(): Building[] {
  return Object.values(buildings);
}

export { wheelerBuilding, dwinelleBuilding };

