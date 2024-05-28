// NOTE: Querys
export type CartGetDTO = {
  cartId: string;
};

export type CartGetByUserDTO = {
  userId: string;
};

// NOTE: Mutations
export type CartCreateDTO = {
  userId: string;
};

export type CartRemoveDTO = {
  cartId: string;
};

export type CartRemoveByUserDTO = {
  userId: string;
};

export type CartAddProductDTO = {
  id: string;
  productId: string;
};
