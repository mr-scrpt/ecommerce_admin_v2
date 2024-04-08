import { CategoryId, CategoryToUpdate } from "@/entities/category";

export type CategoryUpdateComplexible = {
  categoryId: CategoryId;
  categoryData: Partial<CategoryToUpdate>;
  propertyListData: Array<{ id: string }>;
};
