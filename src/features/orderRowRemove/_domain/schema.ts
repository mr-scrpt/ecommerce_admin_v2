import { z } from "zod";

export const orderRowSelectorSchema = z.object({
  id: z.string(),
});
