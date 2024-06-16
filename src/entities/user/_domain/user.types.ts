import { Role } from "@/kernel/domain/role.type";
import type { UserEntity } from "@/kernel/domain/user.type";

export { UserEntity };

export type UserWithCartEntity = UserEntity & {
  cart: UserCartRelation | null;
};

export type UserStrictEntity = UserEntity & {
  name: string;
};

export type UserWithOrdersEntity = UserEntity & {
  orderList: Array<UserOrderRelaion>;
};

export type UserPartial = {
  name?: string | null;
  phone: string;
  email: string;
  image?: string | null;
  role: Role;
  emailVerified?: Date | null;
  createdAt: Date;
};

// NOTE: Projetions

export type User = {
  id: string;
  name: string | null;
  email: string;
  phone: string;
  image?: string | null;
  role: Role;
  emailVerified: Date | null;
  createdAt: Date;
};

export type UserStrict = {
  id: string;
  email: string;
  phone: string;
  name: string;
  image: string | null;
};

// NOTE: Payload
export type UserGetPayload = {
  id: string;
};

export type UserSearchPayload = {
  q: string;
};

// NOTE: Side
type UserCart = {
  id: string;
  userId: string;
  createdAt: Date;
};

type UserCartRelation = UserCart & {
  cartRowList: Array<UserCartRowEntity>;
};

type UserCartRowEntity = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
};

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
  // disabled: boolean;
};
