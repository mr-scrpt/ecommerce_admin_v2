import { Cart } from "@/kernel/domain/cart/cart.type";
import { CartRow } from "@/kernel/domain/cart/cartRow.type";
import { UserEntity } from "@/kernel/domain/user/user.type";

// NOTE: Relation
export type UserWithCartEntity = UserEntity & {
  cart: UserCartRelation | null;
};

export type UserStrictEntity = UserEntity & {
  name: string;
};

export type UserWithOrdersEntity = UserEntity & {
  orderList: Array<UserOrderRelaion>;
};

// NOTE: Payload
export type UserGetPayload = {
  id: string;
};

export type UserSearchPayload = {
  q: string;
};

// NOTE: Side
// type UserCart = {
//   id: string;
//   userId: string;
//   createdAt: Date;
// };

type UserCartRelation = Cart & {
  // cartRowList: Array<UserCartRowEntity>;
  cartRowList: Array<CartRow>;
};

// type UserCartRowEntity = {
//   id: string;
//   cartId: string;
//   productId: string;
//   quantity: number;
//   createdAt: Date;
// };

type UserOrderRelaion = {
  id: string;
  orderNo: string;
  userId: string;
  createdAt: Date;
  orderStatus: string;
  paymentStatus: string;
};

// NOTE: UI
export type UserToSelect = {
  value: string;
  name: string;
  phone: string;
  label: string;
};
