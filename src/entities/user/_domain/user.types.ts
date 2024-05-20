import { Role } from "@/kernel/domain/role.type";
import { UserEntity } from "@/kernel/domain/user.type";

export const userBaseQueryKey = "user";

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
  email: string;
  phone: string;
  name?: string | null;
  image?: string | null;
  role: Role;
  emailVerified?: Date | null;
};

// NOTE: Projetions

export type User = {
  id: string;
  email: string;
  phone: string;
  name: string | null;
  image: string | null;
};

export type UserStrict = {
  id: string;
  email: string;
  phone: string;
  name: string;
  image: string | null;
};
export type UserToCreate = {
  email: string;
  phone: string;
  name?: string | null;
  image?: string | null;
  role: Role;
};

export type UserToUpdate = Partial<User>;

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
  orderNo: number;
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
