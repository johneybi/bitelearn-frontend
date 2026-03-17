export const logError = (scope: string, message: string, error?: unknown) => {
  console.error(`[${scope}] ${message}`, error);
};
