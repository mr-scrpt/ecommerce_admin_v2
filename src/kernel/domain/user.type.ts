import { Role } from "./role.type";

export type UserEntity = {
  id: string;
  name: string | null;
  phone: string;
  email: string;
  role: Role;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt: Date;
};
