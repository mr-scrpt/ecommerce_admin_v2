export const baseQueryKey = "cart";
export type CartId = string;
export type CartSlug = string;

export type CartEntity = {
  id: CartId;
  userId: string;
  createdAt: Date;
};

export type CartRowEntity = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
};

export type CartRelationEntity = CartEntity & {
  cartRowList: Array<CartRowEntity>;
};

// Projetions

export type Cart = {
  id: CartId;
  userId: string;
};

export type CartRelation = Cart & {
  cartRowList: Array<CartRowEntity>;
};

export type CartToCreate = {
  userId: string;
};

// export type CartToUpdate = {
//   id: CartId;
//   productList: Array<CartProduct>;
// };
export type CartToAddProduct = {
  id: CartId;
  productId: string;
};

// CartRow
export type CartRowGetByProductId = {
  cartId: string;
  productId: string;
};

export type CartRowChangeQuantity = {
  id: string;
  quantity: number;
};

export type CartRowToAddProduct = {
  cartId: string;
  productId: string;
  // quantity: number;
};

export type CartRowToRemoveProduct = {
  cartId: string;
  productId: string;
};

// Side
// export type CartRow = {
//   id: string;
//   // name: string;
// };
