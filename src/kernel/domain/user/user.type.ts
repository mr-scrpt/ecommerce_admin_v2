import { Role } from "../role.type";

// NOTE: Base
export type UserBase = {
  name: string | null;
  phone: string;
  email: string;
  role: Role;
  emailVerified: Date | null;
  image?: string | null;
};

// NOTE: Entity
export type UserEntity = UserBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type User = UserBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions

export type UserPartial = {
  name?: string | null;
  phone: string;
  email: string;
  image?: string | null;
  role: Role;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserStrict = {
  id: string;
  email: string;
  phone: string;
  name: string;
  image: string | null;
};
