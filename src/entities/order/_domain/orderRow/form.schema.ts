import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const orderRowFormDefaultSchema = z.object({
  // quantity: z.coerce.number().min(1),
  quantity: z.coerce.number().min(1),
  // quantity: z.string(),
});

export type OrderRowFormDefaultValues = z.infer<
  typeof orderRowFormDefaultSchema
>;

export const defaultFieldsValues: OrderRowFormDefaultValues = {
  quantity: 1,
};
