export type CategoryId = string;
export type CategorySlug = string;

export type CategoryEntity = {
  id: CategoryId;
  name: string;
  slug: CategorySlug;
  createdAt?: Date;
};

export type Category = {
  name: string;
  slug: CategorySlug;
  createdAt: Date;
};
