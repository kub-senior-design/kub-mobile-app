import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "@/navigators/root-navigator";
import SessionProvider from "@/providers/session-provider";

export default function App(): ReactNode {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <RootNavigator />
      </SessionProvider>
    </SafeAreaProvider>
  );
}
