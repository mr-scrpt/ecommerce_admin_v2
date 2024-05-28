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
