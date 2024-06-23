// NOTE: Base
export type PropertyItemBase = {
  name: string;
  value: string;
};

// NOTE: Entity
export type PropertyItemEntity = PropertyItemBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type PropertyItem = PropertyItemBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
