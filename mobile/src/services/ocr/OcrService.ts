import type { OcrResult } from '@types/ocr';
import { recognizeTextFromImageMock } from './mockOcrService';

/**
 * Simple service wrapper around OCR.
 * 
 * This makes it easy to plug in a real OCR provider later
 * without touching the rest of the app.
 */
export interface OcrService {
  recognizeFromCapturedImage(): Promise<OcrResult>;
}

class MockOcrService implements OcrService {
  async recognizeFromCapturedImage(): Promise<OcrResult> {
    // In the MVP we do not use the real camera yet.
    // We just simulate OCR so the rest of the flow works.
    return recognizeTextFromImageMock();
  }
}

const ocrService: OcrService = new MockOcrService();

export function getOcrService(): OcrService {
  return ocrService;
}

