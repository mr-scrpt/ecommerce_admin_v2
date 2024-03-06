import { categoryRepository } from "../_repository/category.repo";

export const getCategoryApi = async (categoryId: string) => {
  return await categoryRepository.getCategory(categoryId);
};
