import { storeFormDefaultSchema } from "@/entities/store";
import { settlementDefaultSelectOptionSchema } from "@/kernel/domain/settlement/form.schema";
import { z } from "zod";

export const storeUpdateFormSchema = storeFormDefaultSchema
  .extend({
    settlement: settlementDefaultSelectOptionSchema.nullable(),
  })
  .omit({
    storeList: true,
  });

export type StoreUpdateFormValues = z.infer<typeof storeUpdateFormSchema>;

// TODO: DefaultValues
export const storeUpdateDefaultFieldsValues: StoreUpdateFormValues = {
  name: "",
  addressLine: "",
  settlement: null,
};
