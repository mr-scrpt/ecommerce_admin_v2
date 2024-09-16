import { Settlement } from "@/kernel/domain/settlement/settlement.type";
import { StoreCreateDTO } from "@/kernel/domain/store/store.dto";
import { StoreBase } from "@/kernel/domain/store/store.type";

type StoreCreatePayload = StoreBase;
type SettlementData = { settlementRef: Settlement["ref"] };

export type StoreCreateTxPayload = {
  storeData: StoreCreatePayload;
  settlementData: SettlementData;
};

export type StoreCreateTxDTO = {
  storeData: StoreCreateDTO["data"];
  settlementData: SettlementData;
};
