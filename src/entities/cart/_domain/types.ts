// NOTE: Base
export type CartBase = {
  userId: string;
};

// NOTE: Entity
export type CartEntity = CartBase & {
  id: string;
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
  productId: string;
  quantity: number;
  createdAt: Date;
};

// NOTE: Payload
export type CartGetPayload = {
  id: string;
};
