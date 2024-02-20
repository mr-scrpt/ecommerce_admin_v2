import { CategoryToUpdate } from "@/entities/category";

export type CategoryUpdateComplexible = {
  categoryData: Partial<CategoryToUpdate>;
  optionListData: Array<{ id: string }>;
  // productListData: Array<{ id: string }>;
};
