import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
import { MultiSelectOptionItem } from "@/shared/ui/multiSelect";

export const baseQueryKey = "cart";
export type CartId = string;
export type CartSlug = string;

export type CartEntity = {
  id: CartId;
  userId: string;
  createdAt: Date;
};

export type CartRelationEntity = CartEntity & {
  productList: Array<CartProduct>;
};

// Projetions

export type Cart = {
  id: CartId;
  userId: string;
};

export type CartRelation = Cart & {
  productList: Array<CartProduct>;
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

// Side
export type CartProduct = {
  id: string;
  // name: string;
};
