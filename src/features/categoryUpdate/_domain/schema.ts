import { z } from "zod";

export const categoryUpdateTxSchema = z.object({
  id: z.string(),
  name: z.string(),
  board: z.array(z.string()),
  propertyList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});
