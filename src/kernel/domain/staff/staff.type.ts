import { RoleEnum } from "../role.type";

// NOTE: Base
export type StaffBase = {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  image?: string | null;
  role: RoleEnum;
};

// NOTE: Entity
export type StaffEntity = StaffBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type Staff = StaffBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
