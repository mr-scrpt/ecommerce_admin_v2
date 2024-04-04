import { UserToCreate } from "@/entities/user/_domain/user.types";

export type UserCreate = {
  email: string;
  phone: string;
  name: string;
};

export type UserCreateComplexible = UserToCreate;
