import { useCategoryListQuery } from "@/entities/category";
import { CategoryId } from "@/entities/category/_domain/types";
import { buildDate } from "@/shared/lib/date";

export const useGetCategoryTableList = (categoryId: CategoryId) => {
  const { isPending, isSuccess, data } = useCategoryListQuery(categoryId);

  const categoryList = data?.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    categoryList: categoryList ?? [],
  };
};