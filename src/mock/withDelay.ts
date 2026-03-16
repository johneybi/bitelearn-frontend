const MOCK_NETWORK_DELAY_MS = 350;

export function withDelay<T>(value: T) {
  return new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(value), MOCK_NETWORK_DELAY_MS);
  });
}
