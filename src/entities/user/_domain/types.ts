export type UserId = string;
export type Role = "ADMIN" | "USER";

export const ROLES: Record<Role, Role> = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export type UserEntity = {
  id: UserId;
  name?: string | null;
  email: string;
  role: Role;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt: Date;
};

export type UserPartial = {
  email: string;
  name?: string | null;
  image?: string | null;
  role: Role;
  emailVerified: Date | null;
};

// export type UserUpdate = {
//   // id: UserId;
//   email?: string;
//   name?: string | null;
//   image?: string | null;
// };

export type SessionEntity = {
  user: {
    id: UserId;
    email: string;
    role: Role;
    name?: string | null;
    image?: string | null;
  };
  expires: string;
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
