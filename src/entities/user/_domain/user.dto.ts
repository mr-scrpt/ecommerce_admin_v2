import { Role } from "@/kernel/domain/role.type";
import { User } from "./user.types";

// NOTE: Queries
export type UserGetDTO = {
  userId: string;
};

export type UserSearchDTO = {
  q: string;
};

// NOTE: Mutations
export type UserCreateDTO = {
  email: string;
  phone: string;
  name?: string | null;
  image?: string | null;
  role: Role;
};

export type UserUpdateDTO = Partial<User>;

export type UserRemoveDTO = {
  userId: string;
};
