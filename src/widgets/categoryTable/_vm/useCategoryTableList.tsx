import { useCategoryListQuery } from "@/entities/category";
import { buildDate } from "@/shared/lib/date";

export const useCategoryTableList = () => {
  const {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    categoryList: data,
  } = useCategoryListQuery();

  const categoryList = data?.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    categoryList: categoryList ?? [],
  };
};
