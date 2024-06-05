import { CartRow, CartRowEntity } from "./cartRow.types";

// NOTE: Base
export type CartBase = {
  userId: string;
};

// NOTE: Entity
export type CartEntity = CartBase & {
  id: string;
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

// NOTE: Selector
export type CartGetSelector = {
  id: string;
};
