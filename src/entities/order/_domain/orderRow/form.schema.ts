import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const orderRowFormDefaultSchema = z.object({
  quantity: z.coerce.number().min(1),
});

export type OrderRowFormDefaultValues = z.infer<
  typeof orderRowFormDefaultSchema
>;

export const orderRowDefaultFieldsValues: OrderRowFormDefaultValues = {
  quantity: 1,
};
