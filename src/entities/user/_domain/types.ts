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
export type ProfileEntity = UserEntity;

export type UserPartial = {
  email: string;
  name?: string | null;
  image?: string | null;
  role: Role;
  emailVerified: Date | null;
};

// Projetions

export type Profile = {
  email: string;
  name?: string | null;
  image?: string | null;
};

export type User = {
  // id: UserId;
  email?: string;
  name?: string | null;
  image?: string | null;
};
