type Success<T> = [T, null];
type Failure = [null, Error];

export type Result<T> = Success<T> | Failure;

export function success<T>(value: T): Success<T> {
  return [value, null];
}

export function failure(error: unknown): Failure {
  if (error instanceof Error) {
    return [null, error];
  }

  return [null, new Error(String(error))];
}
