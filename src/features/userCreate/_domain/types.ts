export type {
  UserCreateTxPayload,
  UserCreateTxDTO,
} from "@/kernel/lib/nextauth/type";

export type UserCreate = {
  name: string;
  phone: string;
  email: string;
};
