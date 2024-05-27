import { z } from "zod";

export const createInputSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
  propertyList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});
