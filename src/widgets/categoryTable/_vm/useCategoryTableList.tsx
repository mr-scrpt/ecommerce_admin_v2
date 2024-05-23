import { useCategoryListQuery } from "@/entities/category";
import { buildDate } from "@/shared/lib/date";

export const useCategoryTableList = () => {
  const { categoryList, isPending, isSuccess, isFetchedAfterMount } =
    useCategoryListQuery();

  const categoryListBuild = categoryList?.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    categoryList: categoryListBuild ?? [],
  };
};
