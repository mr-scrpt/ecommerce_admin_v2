import { z } from "zod";

// NOTE: Select Owner
export const orderSelectOwnerSchema = z.object({
  ownerId: z.string(),
});

export type OrderSelectOwnerValues = z.infer<typeof orderSelectOwnerSchema>;
