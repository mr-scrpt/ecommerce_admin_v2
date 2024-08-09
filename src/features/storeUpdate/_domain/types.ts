import { StoreUpdateDTO } from "@/kernel/domain/store/store.dto";
import { Store } from "@/kernel/domain/store/store.type";

type StoreUpdatePayload = Partial<Store>;

export type StoreUpdateTxPayload = {
  selector: StoreUpdateSelector;
  storeData: StoreUpdatePayload;
};

export type StoreUpdateTxDTO = {
  selector: StoreUpdateSelector;

  storeData: StoreUpdateDTO["data"];
};

// NOTE: Selector
export type StoreUpdateSelector = {
  id: string;
};
