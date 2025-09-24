import { ReactNode } from "react";

import Login from "@/components/login";
import SessionProvider from "@/providers/session-provider";

export default function App(): ReactNode {
  return (
    <SessionProvider>
      <Login />
    </SessionProvider>
  );
}
