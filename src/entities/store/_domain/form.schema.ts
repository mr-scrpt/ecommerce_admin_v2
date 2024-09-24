import { storeDefaultSelectOptionSchema } from "@/kernel/domain/store/form.schema";
import { StoreDefaultSelectOption } from "@/kernel/domain/store/form.schema";
import { Store } from "@/kernel/domain/store/store.type";
import { filterNullValues } from "@/shared/lib/filter";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

// export const storeFormDefaultSchema = z.object({
//   name: z.string(),
//   store: z.string(),
//   storeList: z.array(storeDefaultSelectOptionSchema),
// });

export const storeFormDefaultSchema = z.object({
  name: z.string(),
  store: z.string(),
  storeList: z.array(storeDefaultSelectOptionSchema).optional(),
});

export type StoreFormDefaultValues = z.infer<typeof storeFormDefaultSchema>;

// TODO: DefaultValues
export const storeDefaultFieldsValues: StoreFormDefaultValues = {
  name: "",
  store: "",

  storeList: [],
};

// NOTE: Build Post Office Option
export const buildStoreOption = (
  store?: Store | null,
): StoreDefaultSelectOption | null =>
  store
    ? {
        value: store.id,
        label: store.address,
        address: store.address,
        name: store.name,
      }
    : null;

export const buildStoreOptionsArray = (
  store?: Array<Store | null | undefined> | null,
): StoreDefaultSelectOption[] =>
  store ? filterNullValues(store.map(buildStoreOption)) : [];
