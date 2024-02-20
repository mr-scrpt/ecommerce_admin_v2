import { CategoryToCreate } from "@/entities/category";

export type CategoryCreateComplexible = {
  categoryData: CategoryToCreate;
  optionListData: Array<{ id: string }>;
  productListData: Array<{ id: string }>;
};
