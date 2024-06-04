// NOTE: Queries
export type CartGetDTO = {
  id: string;
};

export type CartGetByUserDTO = {
  userId: string;
};

// NOTE: Mutations
export type CartCreateDTO = {
  id: string;
};

export type CartRemoveDTO = {
  id: string;
};

export type CartRemoveByUserDTO = {
  userId: string;
};

export type CartAddProductDTO = {
  id: string;
  productId: string;
};
