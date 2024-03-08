export type UserId = string;
export type Role = "ADMIN" | "USER";

export type SessionEntity = {
  user: {
    id: UserId;
    email: string;
    role: Role;
    cartId: string;
    name?: string | null;
    image?: string | null;
  };
  expires: string;
};

export const ROLES: Record<Role, Role> = {
  ADMIN: "ADMIN",
  USER: "USER",
};
