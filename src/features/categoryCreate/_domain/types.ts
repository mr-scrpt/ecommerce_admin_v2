import { CategoryToCreate } from "@/entities/category";

export type CategoryCreateComplexible = {
  categoryData: CategoryToCreate;
  propertyListData: Array<{ id: string }>;
  // productListData: Array<{ id: string }>;
};
