// NOTE: Queries
export type CartRowGetByProductDTO = {
  cartId: string;
  productId: string;
};

// NOTE: Mutations
//
export type CartRowRemoveDTO = {
  cartId: string;
};
export type CartRowChangeQuantityDTO = {
  id: string;
  quantity: number;
};

export type CartRowAddProductDTO = {
  cartId: string;
  productId: string;
};

export type CartRowRemoveProductDTO = {
  cartId: string;
  productId: string;
};
