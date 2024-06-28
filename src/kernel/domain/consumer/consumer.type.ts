// NOTE: Base
export type ConsumerBase = {
  name: string;
  phone: string;
  email: string;
  image?: string | null;
};

// NOTE: Entity
export type ConsumerEntity = ConsumerBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type Consumer = ConsumerBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
