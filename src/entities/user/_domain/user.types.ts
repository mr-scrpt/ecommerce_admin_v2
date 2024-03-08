export const userBaseQueryKey = "user";
import { Role, UserId } from "@/shared/lib/user";

export type UserEntity = {
  id: UserId;
  name?: string | null;
  email: string;
  role: Role;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt: Date;
};

export type UserRelationEntity = UserEntity & {
  cart: UserCart;
};

export type UserPartial = {
  email: string;
  name?: string | null;
  image?: string | null;
  role: Role;
  emailVerified?: Date | null;
};

// Projetions

export type User = {
  // id: UserId;
  email?: string;
  name?: string | null;
  image?: string | null;
};

export type UserToCreate = {
  // id: UserId;
  email: string;
  name?: string | null;
  image?: string | null;
  role: Role;
};

// Side
type UserCart = {
  id: string;
};
