import { Store } from "@/kernel/domain/store/store.type";

type StoreWithSettlementName = Omit<Store, "settlementRef"> & {
  settlementName: string;
};

export type StoreData = {
  storeData: StoreWithSettlementName;
};

export type StoreDataUI = {
  storeData?: StoreWithSettlementName;
};
