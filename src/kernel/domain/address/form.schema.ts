import { z } from "zod";
import { Address } from "./address.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select Address Option
export const addressDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  street: z.string(),
  house: z.string(),
  apartment: z.string().nullable(),
  active: z.boolean().optional(),
});

export type AddressDefaultSelectOption = z.infer<
  typeof addressDefaultSelectOptionSchema
>;

// NOTE: Build Address Option
export const buildAddressOption = (
  address?: Address | null,
): AddressDefaultSelectOption | null =>
  address
    ? {
        value: address.id,
        // label: address.street,
        label: `${address.street}, ${address.house} ${address.apartment}`,
        street: address.street,
        house: address.house,
        apartment: address.apartment,
      }
    : null;

export const buildAddressOptionsArray = (
  address?: Array<Address | null | undefined> | null,
): AddressDefaultSelectOption[] =>
  address ? filterNullValues(address.map(buildAddressOption)) : [];
