import { Settlement } from "@/kernel/domain/settlement/settlement.type";
import { StoreUpdateDTO } from "@/kernel/domain/store/store.dto";
import { Store } from "@/kernel/domain/store/store.type";

type StoreUpdatePayload = Partial<Store>;
type SettlementData = { settlementRef: Settlement["ref"] };

export type StoreUpdateTxPayload = {
  selector: StoreUpdateSelector;
  storeData: StoreUpdatePayload;
  settlementData: SettlementData;
};

export type StoreUpdateTxDTO = {
  selector: StoreUpdateSelector;

  storeData: StoreUpdateDTO["data"];
  settlementData: SettlementData;
};

// NOTE: Selector
export type StoreUpdateSelector = {
  id: string;
};
