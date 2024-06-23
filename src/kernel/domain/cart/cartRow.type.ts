// NOTE: Base
export type CartRowBase = {
  cartId: string;
  productId: string;
  quantity: number;
};

// NOTE: Entity
export type CartRowEntity = CartRowBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type CartRow = CartRowBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
