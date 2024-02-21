import { CategoryId, CategoryToUpdate } from "@/entities/category";

export type CategoryUpdateComplexible = {
  categoryId: CategoryId;
  categoryData: Partial<CategoryToUpdate>;
  optionListData: Array<{ id: string }>;
  // productListData: Array<{ id: string }>;
};
