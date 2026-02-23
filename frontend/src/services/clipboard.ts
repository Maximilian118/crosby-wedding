/**
 * Copies the given text to the user's clipboard.
 * Returns true on success, false on failure.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
