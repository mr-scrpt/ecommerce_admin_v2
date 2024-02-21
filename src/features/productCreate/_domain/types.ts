import { ProductToCreate } from "@/entities/product";

export type ProductCreateComplexible = {
  productData: ProductToCreate;
  categoryListData: Array<{ id: string }>;
};
