// import { useCategoryListQuery } from "@/entities/category";
import { categoryApi } from "@/entities/category";
import { buildDate } from "@/shared/lib/date";

export const useCategoryTableList = () => {
  const { data } = categoryApi.category.get.useQuery();
  console.log("output_log: data cat =>>>", data);
  // const {
  //   isPending,
  //   isSuccess,
  //   isFetchedAfterMount,
  //   categoryList: data,
  // } = useCategoryListQuery();

  // const categoryList = data?.map((item) => ({
  //   id: item.id,
  //   name: item.name,
  //   slug: item.slug,
  //   createdAt: buildDate(item.createdAt),
  // }));

  // return {
  //   isPending,
  //   isSuccess,
  //   isFetchedAfterMount,
  //   categoryList: categoryList ?? [],
  // };
  return {
    isPending: false,
    isSuccess: true,
    isFetchedAfterMount: true,
    categoryList: [],
  };
};
