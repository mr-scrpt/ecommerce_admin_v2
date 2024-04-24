export const baseQueryKey = "store";

type StoreBase = {
  settlement: string;
  address: string;
};

export type StoreEntity = StoreBase & {
  id: string;
  createdAt: Date;
};

// NOTE: Projetions

export type Store = StoreBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Actions
export type StoreToCreate = {
  settlement: string;
  address: string;
};

export type StoreToUpdate = {
  id: string;
  settlement: string;
  address: string;
};
