// NOTE: Entity
export type CartEntity = {
  id: string;
  userId: string;
  createdAt: Date;
};

export type CartRowEntity = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
};

export type CartRelationEntity = CartEntity & {
  cartRowList: Array<CartRowEntity>;
};

// NOTE: Projetions
export type Cart = {
  id: string;
  userId: string;
  createdAt: Date;
};

export type CartRelation = Cart & {
  cartRowList: Array<CartRow>;
};

export type CartRow = {
  id: string;
  quantity: number;
  createdAt: Date;
};

// NOTE: Payload
export type CartGetPayload = {
  cartId: string;
};

export type CartToCreate = {
  userId: string;
};

export type CartToAddProduct = {
  id: string;
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
