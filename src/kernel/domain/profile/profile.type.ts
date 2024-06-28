// NOTE: Base
export type ProfileBase = {
  name: string | null;
  phone: string;
  email: string;
  image?: string | null;
};

// NOTE: Entity
export type ProfileEntity = ProfileBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type Profile = ProfileBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
