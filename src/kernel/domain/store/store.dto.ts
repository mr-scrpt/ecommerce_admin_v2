import { StoreBase } from "@/kernel/domain/store/store.type";

// NOTE: Queries
export type StoreGetDTO = {
  id: string;
};

export type StoreGetBySettlementRefDTO = {
  settlementRef: string;
};

// NOTE: Mutations
export type StoreCreateDTO = {
  data: StoreBase;
};

export type StoreUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<StoreBase>;
};

export type StoreRemoveDTO = {
  selector: {
    id: string;
  };
};
