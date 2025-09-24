import { z } from "zod";

export const userSchema = z.object({
  roles: z.array(z.string()),
  emails: z.array(z.string()),
  noAccounts: z.boolean(),
  fiberUsername: z.string(),
  name: z.string(),
  personId: z.string(),
  accounts: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;
