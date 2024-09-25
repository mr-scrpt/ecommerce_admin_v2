import { Address } from "@/kernel/domain/address/address.type";
import {
  AddressDefaultSelectOption,
  addressDefaultSelectOptionSchema,
} from "@/kernel/domain/address/form.schema";
import { filterNullValues } from "@/shared/lib/filter";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const addressFormDefaultSchema = z.object({
  street: z.string(),
  house: z.string(),
  apartment: z.string(),

  addressList: z.array(addressDefaultSelectOptionSchema).optional(),
});

export type AddressFormDefaultValues<
  T extends z.ZodTypeAny = typeof addressFormDefaultSchema,
> = z.infer<T>;

// TODO: DefaultValues
export const addressDefaultFieldsValues: AddressFormDefaultValues = {
  street: "",
  house: "",
  apartment: "",
  addressList: [],
};
