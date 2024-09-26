import { settlementDefaultSelectOptionSchema } from "@/kernel/domain/settlement/form.schema";
import { z } from "zod";

// NOTE: FORM UI
// NOTE: Main information
export const settlementFormDefaultSchema = z.object({
  settlement: settlementDefaultSelectOptionSchema.nullable(),
});

export type SettlementFormDefaultValues<
  T extends z.ZodTypeAny = typeof settlementFormDefaultSchema,
> = z.infer<T>;

// TODO: Default Form Values
export const settlementDefaultFieldsValues: SettlementFormDefaultValues = {
  settlement: null,
};
