import { z } from "zod";
import { Settlement } from "./settlement.type";
import { filterNullValues } from "@/shared/lib/filter";

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

export const buildSettlementOptionsArray = (
  settlementList?: Array<Settlement | null | undefined> | null,
): Array<SettlementDefaultSelectOption> =>
  settlementList
    ? filterNullValues(settlementList.map(buildSettlementOption))
    : [];
