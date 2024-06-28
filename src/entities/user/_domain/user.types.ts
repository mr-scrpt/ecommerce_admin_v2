import { CartComposite } from "@/kernel/domain/cart/cart.type";
import { Order } from "@/kernel/domain/order/order.type";
import { UserEntity } from "@/kernel/domain/user/user.type";

// NOTE: Selector
export type UserGetSelector = {
  id: string;
};

export type UserSearchSelector = {
  q: string;
};

// NOTE: Relation
export type UserWithCartEntity = UserEntity & {
  cart: CartComposite | null;
};

export type UserWithOrdersEntity = UserEntity & {
  orderList: Array<Order>;
};
