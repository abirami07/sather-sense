import { useState } from 'react';
import { getOcrService } from '@services/ocr/OcrService';
import { getBuildingById, wheelerBuilding } from '@data/index';
import { findNodeByText } from '@utils/matching';
import type { Node } from '@types/building';

/**
 * Manages the user's current location inside a building.
 *
 * For the MVP we always assume Wheeler Hall as the active building.
 */
export function useCurrentLocation() {
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [status, setStatus] = useState<'idle' | 'detecting' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function detectLocationFromImage() {
    setStatus('detecting');
    setError(null);
    const ocr = getOcrService();

    try {
      const result = await ocr.recognizeFromCapturedImage();
      const building = getBuildingById(wheelerBuilding.id);
      if (!building) {
        throw new Error('Building not found');
      }
      const node = findNodeByText(building, result.text);
      if (!node) {
        setStatus('error');
        setError('Could not match the detected text to a known room.');
        return;
      }
      setCurrentNode(node);
      setStatus('done');
    } catch (e) {
      setStatus('error');
      setError('Something went wrong while detecting your location.');
    }
  }

  return {
    currentNode,
    status,
    error,
    detectLocationFromImage
  };
}

