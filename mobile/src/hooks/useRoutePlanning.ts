import { useState } from 'react';
import { wheelerBuilding } from '@data/index';
import { buildRoute } from '@services/routing/instructionGenerator';
import type { Route } from '@types/navigation';

/**
 * Computes and stores a walking route between two nodes.
 */
export function useRoutePlanning() {
  const [route, setRoute] = useState<Route | null>(null);
  const [status, setStatus] = useState<'idle' | 'planning' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  function planRoute(startNodeId: string, endNodeId: string) {
    setStatus('planning');
    setError(null);
    const result = buildRoute(wheelerBuilding, startNodeId, endNodeId);
    if (!result) {
      setStatus('error');
      setError('Could not find a path between those locations.');
      return;
    }
    setRoute(result);
    setStatus('done');
  }

  return {
    route,
    status,
    error,
    planRoute
  };
}

