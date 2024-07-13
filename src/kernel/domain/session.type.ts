import { RoleEnum } from "./role.type";

export type SessionEntity = {
  user: {
    id: string;
    name?: string | null;
    lastName?: string | null;
    email: string;
    role: RoleEnum;
    cartId: string;
    image?: string | null;
  };
  expires: string;
};
