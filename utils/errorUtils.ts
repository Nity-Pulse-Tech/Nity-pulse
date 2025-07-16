// utils/errorUtils.ts
export function isAxiosError(error: unknown): error is { response?: { status?: number }; message?: string } {
    return typeof error === 'object' && error !== null && 'response' in error;
  }
  