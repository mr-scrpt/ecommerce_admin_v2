export const baseQueryKey = "product";

export type ProductId = string;
export type ProductSlug = string;

export type ProductCategory = {
  id: string;
  name: string;
};

export type ProductEntity = {
  id: ProductId;
  name: string;
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
  // categoryList: Array<ProductCategory>;

  createdAt: Date;
};

// Projetions

export type Product = {
  name: string;
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
};

export type ProductRelation = {
  name: string;
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
  categoryList: Array<ProductCategory>;
};
