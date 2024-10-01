import { storeDefaultSelectOptionSchema } from "@/kernel/domain/store/form.schema";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const storeFormDefaultSchema = z.object({
  name: z.string(),
  addressLine: z.string(),
  storeList: z.array(storeDefaultSelectOptionSchema).optional(),
});

export type StoreFormDefaultValues = z.infer<typeof storeFormDefaultSchema>;

// TODO: DefaultValues
export const storeDefaultFieldsValues: StoreFormDefaultValues = {
  name: "",
  addressLine: "",

  storeList: [],
};
