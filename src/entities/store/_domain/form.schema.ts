import { addressDefaultSelectOptionSchema } from "@/kernel/domain/address/form.schema";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

// export const storeFormDefaultSchema = z.object({
//   name: z.string(),
//   address: z.string(),
//   storeList: z.array(addressDefaultSelectOptionSchema),
// });

export const storeFormDefaultSchema = z.object({
  name: z.string(),
  address: z.string(),
  storeList: z.array(addressDefaultSelectOptionSchema).optional(),
});

export type StoreFormDefaultValues = z.infer<typeof storeFormDefaultSchema>;

// TODO: DefaultValues
export const storeDefaultFieldsValues: StoreFormDefaultValues = {
  name: "",
  address: "",

  storeList: [],
};
