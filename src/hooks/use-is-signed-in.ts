import useSession from "./use-session";

export function useIsSignedIn(): boolean {
  const { user } = useSession();
  return user !== null;
}

export function useIsSignedOut(): boolean {
  return !useIsSignedIn();
}
