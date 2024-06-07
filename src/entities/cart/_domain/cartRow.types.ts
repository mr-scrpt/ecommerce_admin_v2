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
};

// NOTE: Projetions
export type CartRow = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
};
