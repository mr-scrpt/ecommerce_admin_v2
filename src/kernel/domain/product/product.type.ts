// NOTE: Base
export type ProductBase = {
  name: string;
  article: string;
  description: string;
  about: string;
  inStock: number;
  slug: string;
  img: Array<string>;
  price: number;
};

// NOTE: Entity
export type ProductEntity = ProductBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

//NOTE: Projetions
export type Product = ProductBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
