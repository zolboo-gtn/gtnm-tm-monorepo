export const tryParseJson = <T = unknown>(json: any): T | undefined => {
  try {
    const parsed = JSON.parse(json) as T;
    return parsed;
  } catch (error) {
    return;
  }
};
