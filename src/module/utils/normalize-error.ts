export class NormalizeError {
  public normalizeError(error: unknown) {
    if (error instanceof Error) {
      return new Error(error.message);
    } else {
      return new Error('unknown error');
    }
  }
}

export const normalizeError = new NormalizeError().normalizeError;
