export const baseQueryKey = "product";
export type ProductId = string;
export type ProductSlug = string;

export type ProductEntity = {
  id: ProductId;
  name: string;
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
  createdAt: Date;
};

export type ProductRelationEntity = ProductEntity & {
  categoryList: Array<ProductCategory>;
};

// Projetions

export type Product = {
  name: string;
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
};

export type ProductRelation = Product & {
  categoryList: Array<ProductCategory>;
};

export type ProductToCreate = {
  name: string;
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
  // categoryList: Array<{ id: string }>;
};

export type ProductAddCategoryList = {
  productId: string;
  categoryListId: Array<{ id: string }>;
};

export type ProductToUpdate = {
  id: ProductId;
  name: string;
  description: string;
  about: string;
  slug: ProductSlug;
  img: Array<string>;
  categoryList: Array<{ id: string }>;
};

// Side
export type ProductCategory = {
  id: string;
  name: string;
};
