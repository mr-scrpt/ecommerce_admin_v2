import { Role } from "../role.type";

// NOTE: Base
export type ConsumerBase = {
  name: string;
  phone: string;
  email: string;
  role: Role;
  emailVerified: Date;
  image?: string | null;
};

// NOTE: Projetions
export type Consumer = ConsumerBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
