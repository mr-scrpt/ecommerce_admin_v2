import {
  Settlement,
  SettlementEntity,
} from "@/kernel/domain/settlement/settlement.type";
import { Store, StoreEntity } from "@/kernel/domain/store/store.type";

// NOTE: Relations
export type StoreRelation = Store & {
  settlement: Settlement;
};

export type StoreRelationEntity = StoreEntity & {
  settlement: SettlementEntity;
};

// NOTE: Selector
export type StoreGetSelector = {
  id: string;
};

export type StoreGetBySettlementRefSelector = {
  settlementRef: string;
};

// NOTE: UI
export type StoreToSelect = {
  value: string;
  label: string;
};
