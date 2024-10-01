import { z } from "zod";
import { Store } from "./store.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select Store Option
export const storeDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  address: z.string(),
  name: z.string(),
  active: z.boolean().optional(),
});

export type StoreDefaultSelectOption = z.infer<
  typeof storeDefaultSelectOptionSchema
>;

// NOTE: Build Post Office Option
export const buildStoreOption = (
  store?: Store | null,
): StoreDefaultSelectOption | null =>
  store
    ? {
        value: store.id,
        label: `"${store.name}", ${store.addressLine}`,
        address: store.addressLine,
        name: store.name,
      }
    : null;

export const buildStoreOptionsArray = (
  store?: Array<Store | null | undefined> | null,
): StoreDefaultSelectOption[] =>
  store ? filterNullValues(store.map(buildStoreOption)) : [];
