import { z } from "zod";

// NOTE: Form
export const settlementItemFormSchema = z.object({
  id: z.string().optional(),
  value: z.string(),
  area: z.string(),
  region: z.string(),
  label: z.string(),
});

export const settlementFormSchema = z.object({
  settlementList: z.array(settlementItemFormSchema),
});

export type SettlementFormValues = z.infer<typeof settlementFormSchema>;
