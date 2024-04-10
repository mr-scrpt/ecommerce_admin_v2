import { ROLE as ROLES } from "@prisma/client";
export type UserId = string;
export type Role = (typeof ROLES)[keyof typeof ROLES];
export { ROLES };

export type SessionEntity = {
  user: {
    id: UserId;
    email: string;
    role: Role;
    cartId: string;
    name: string | null;
    image?: string | null;
  };
  expires: string;
};
