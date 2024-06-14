import { z } from "zod";

export const propertySelectorSchema = z.object({
  id: z.string(),
});
