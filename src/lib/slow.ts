// Utilities to simulate slow API responses for testing Suspense and transitions

export async function simulateSlowResponse<T>(
  response: T,
  delay: number = 2000
): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, delay));
  return response;
}

export async function simulateRandomDelay<T>(
  response: T,
  minDelay: number = 1000,
  maxDelay: number = 3000
): Promise<T> {
  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  await new Promise(resolve => setTimeout(resolve, delay));
  return response;
}

export async function simulateOccasionalFailure<T>(
  response: T,
  failureRate: number = 0.1
): Promise<T> {
  if (Math.random() < failureRate) {
    throw new Error('Simulated API failure');
  }
  return response;
}

export function getSlowMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('slowMode') === 'true';
}

export function setSlowMode(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('slowMode', enabled.toString());
}
