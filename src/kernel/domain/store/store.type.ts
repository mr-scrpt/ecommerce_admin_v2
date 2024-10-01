// NOTE: Base
export type StoreBase = {
  name: string;
  addressLine: string;
};

// NOTE: Entity
export type StoreEntity = StoreBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type Store = StoreBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
