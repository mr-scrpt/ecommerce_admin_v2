import { CartRow, CartRowEntity } from "./cartRow.type";

// NOTE: Base
export type CartBase = {
  userId: string;
};

// NOTE: Entity
export type CartEntity = CartBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CartCompositeEntity = CartEntity & {
  cartRowList: Array<CartRowEntity>;
};

// NOTE: Projetions
export type Cart = CartBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CartComposite = Cart & {
  cartRowList: Array<CartRow>;
};
