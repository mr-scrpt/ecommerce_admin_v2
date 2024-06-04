import { Role } from "./role.type";

export type UserBase = {
  name: string | null;
  phone: string;
  email: string;
  role: Role;
  emailVerified?: Date | null;
  image?: string | null;
};

export type UserEntity = UserBase & {
  id: string;
  createdAt: Date;
};
