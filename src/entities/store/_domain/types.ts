export const baseQueryKey = "store";

type StoreBase = {
  name: string;
  settlement: string;
  address: string;
};

export type StoreEntity = StoreBase & {
  id: string;
  createdAt: Date;
};

// export type StoreRelationEntity = StoreEntity & {
//   settlementName: string;
// };

// NOTE: Projetions

export type Store = StoreBase & {
  id: string;
  createdAt: Date;
};

export type StoreWithSettlementName = StoreBase & {
  id: string;
  settlementName: string;
  createdAt: Date;
};

// export type StoreRelation = Store & {
//   settlementName: string;
// };

// NOTE: Actions
export type StoreToCreate = {
  name: string;
  settlement: string;
  address: string;
};

export type StoreToUpdate = {
  id: string;
  name: string;
  settlement: string;
  address: string;
};
