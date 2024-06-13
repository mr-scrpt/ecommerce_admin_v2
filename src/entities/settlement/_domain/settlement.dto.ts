import { SettlementBase } from "./settlement.type";

// NOTE: Queries
export type SettlementGetDTO = {
  id: string;
};

export type SettlementGetByRefDTO = {
  ref: string;
};

export type SettlementSearchDTO = {
  q: string;
};

// NOTE: Mutations
export type SettlementCreateDTO = {
  data: SettlementBase;
};
