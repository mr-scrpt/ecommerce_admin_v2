import {
  SettlementDefaultSelectOption,
  settlementDefaultSelectOptionSchema,
} from "@/kernel/domain/settlement/form.schema";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";
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
// NOTE: Build Settlement Option
export const buildSettlementOption = (
  settlement?: Settlement | null,
): SettlementDefaultSelectOption | null =>
  settlement
    ? {
        value: settlement.ref,
        label: settlement.description,
        area: settlement.areaDescription,
        region: settlement.regionsDescription,
      }
    : null;
