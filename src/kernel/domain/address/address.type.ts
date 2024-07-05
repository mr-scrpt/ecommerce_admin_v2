// NOTE: Base
export type AddressBase = {
  userId: string;
  settlementRef: string;
  street: string;
  house: string;
  apartment: string | null;
};

// NOTE: Entity
export type AddressEntity = AddressBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type Address = AddressBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
