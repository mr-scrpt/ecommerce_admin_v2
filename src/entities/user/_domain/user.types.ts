export const userBaseQueryKey = "user";
import { Role, UserId } from "@/shared/lib/user";

export type UserEntity = {
  id: UserId;
  name?: string | null;
  phone?: string;
  email: string;
  role: Role;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt: Date;
};

export type UserWithCartEntity = UserEntity & {
  cart: UserCartRelation | null;
};

export type UserWithOrdersEntity = UserEntity & {
  orderList: Array<UserOrderRelaion>;
};

export type UserPartial = {
  email: string;
  phone?: string | null;
  name?: string | null;
  image?: string | null;
  role: Role;
  emailVerified?: Date | null;
};

// Projetions

export type User = {
  id: UserId;
  email?: string;
  phone?: string;
  name?: string | null;
  image?: string | null;
};

export type UserToCreate = {
  // id: UserId;
  email: string;
  phone: string;
  name?: string | null;
  image?: string | null;
  role: Role;
};

// Side
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
