import { CartComposite } from "@/kernel/domain/cart/cart.type";

// NOTE: Relations
export type CartRelationEntity = CartComposite;
export type CartRelation = CartComposite;

// NOTE: Selector
export type CartGetSelector = {
  id: string;
};
