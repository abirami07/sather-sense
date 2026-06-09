import type { OcrResult } from '@types/ocr';

/**
 * Placeholder OCR implementation.
 *
 * In a real app this would call a cloud OCR service
 * or on-device model. For now we just return a fixed
 * result so the rest of the app can be tested.
 */
export async function recognizeTextFromImageMock(): Promise<OcrResult> {
  // You can change this string while testing
  // to simulate different detected rooms.
  return {
    text: 'Room 202'
  };
}

