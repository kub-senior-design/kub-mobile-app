import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "@/navigators/root-navigator";
import SessionProvider from "@/providers/session-provider";

const queryClient = new QueryClient();

export default function App(): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SessionProvider>
          <RootNavigator />
        </SessionProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
