import { StoreBase } from "@/kernel/domain/store/store.type";

// NOTE: Queries
export type StoreGetDTO = {
  id: string;
};

export type StoreGetBySettlementRefDTO = {
  settlementRef?: string;
};

// NOTE: Mutations
export type StoreCreateDTO = {
  data: StoreBase;
  relations: {
    settlementRef: string;
  };
};

export type StoreUpdateDTO = {
  selector: {
    id: string;
  };
  data: Partial<StoreBase>;
  relations: {
    settlementRef: string;
  };
};

export type StoreRemoveDTO = {
  selector: {
    id: string;
  };
};
