import { z } from "zod";

// NOTE: Select Settlement Option
export const settlementDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  area: z.string(),
  region: z.string(),
  active: z.boolean().optional(),
});

export type SettlementDefaultSelectOption = z.infer<
  typeof settlementDefaultSelectOptionSchema
>;
