import { useContext } from "react";

import {
  SessionContext,
  SessionContextType,
} from "@/providers/session-provider";

export default function useSession(): SessionContextType {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}
