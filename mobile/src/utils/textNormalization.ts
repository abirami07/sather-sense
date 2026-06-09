/**
 * Normalizes text from OCR or speech so we can match it to nodes.
 *
 * Example:
 *  - "Room 202" -> "202"
 *  - "take me to room 101" -> "101"
 */
export function extractRoomNumber(raw: string): string | null {
  const lower = raw.toLowerCase();
  const match = lower.match(/room\s*(\d+)/);
  if (match) {
    return match[1];
  }

  const digits = lower.match(/\d+/);
  return digits ? digits[0] : null;
}

