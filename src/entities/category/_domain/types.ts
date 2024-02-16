export const baseQueryKey = "category";
export type CategoryId = string;
export type CategorySlug = string;

export type CategoryEntity = {
  id: CategoryId;
  name: string;
  slug: CategorySlug;
  board: Array<string>;
  createdAt: Date;
};

export type CategoryOption = {
  id: CategoryId;
  name: string;
};
// Projetions

export type Category = {
  name: string;
  slug: CategorySlug;
  board: Array<string>;
  // createdAt: Date;
};
