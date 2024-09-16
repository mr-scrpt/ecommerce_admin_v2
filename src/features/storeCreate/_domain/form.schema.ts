import { storeFormDefaultSchema } from "@/entities/store";
import { settlementDefaultSelectOptionSchema } from "@/kernel/domain/settlement/form.schema";
import { z } from "zod";

export const storeCreateFormSchema = storeFormDefaultSchema
  .extend({
    settlement: settlementDefaultSelectOptionSchema.nullable(),
  })
  .omit({
    storeList: true,
  });

export type StoreCreateFormValues = z.infer<typeof storeCreateFormSchema>;

// TODO: DefaultValues
export const storeCreateDefaultFieldsValues: StoreCreateFormValues = {
  name: "",
  address: "",
  settlement: null,
};
