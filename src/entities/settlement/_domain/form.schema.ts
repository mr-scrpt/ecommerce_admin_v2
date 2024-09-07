// import { selectSettlementItemSchema } from "@/kernel/domain/settlement/settlement.schema";
import { selectSettlementItemSchema } from "@/kernel/domain/settlement/settlement.schema";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

// NOTE: Form
// export const settlementItemFormSchema = z.object({
//   id: z.string().optional(),
//   value: z.string(),
//   area: z.string(),
//   region: z.string(),
//   label: z.string(),
// });
//
// export const settlementFormSchema = z.object({
//   // settlementList: z.array(settlementItemFormSchema),
//   settlementRef: z.string(),
// });
//
// export type SettlementFormValues = z.infer<typeof settlementFormSchema>;
//
// NOTE: FORM
// NOTE: Main information
export const settlementFormDefaultSchema = z.object({
  // settlement: selectItemSchema(z.string()).optional(),
  settlement: selectSettlementItemSchema,
});

export type SettlementFormDefaultValues<
  T extends z.ZodTypeAny = typeof settlementFormDefaultSchema,
> = z.infer<T>;

// TODO: DefaultValues
export const defaultFieldsValues: SettlementFormDefaultValues = {
  settlement: { label: "", value: "", area: "", region: "" },
};
