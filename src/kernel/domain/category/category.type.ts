// NOTE: Base
export type CategoryBase = {
  name: string;
  slug: string;
  board: Array<string>;
};

// NOTE: Entity
export type CategoryEntity = CategoryBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// NOTE: Projetions
export type Category = CategoryBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
