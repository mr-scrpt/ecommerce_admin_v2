import { StoreToUpdate } from "@/entities/store";

export type StoreUpdateComplexible = {
  storeId: string;
  storeData: Partial<StoreToUpdate>;
};
