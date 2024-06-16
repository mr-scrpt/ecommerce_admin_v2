import { Role } from "@/kernel/domain/role.type";

type ConsumerBase = {
  name: string;
  phone: string;
  email: string;
  role: Role;
  emailVerified: Date;
  image?: string | null;
};

export type Consumer = ConsumerBase & {
  id: string;
  createdAt: Date;
};

// NOTE: Selector
export type ConsumerGetSelector = {
  id: string;
};

export type ConsumerGetByOrderSelector = {
  orderId: string;
};
