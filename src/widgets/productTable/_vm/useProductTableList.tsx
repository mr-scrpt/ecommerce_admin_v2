import { useProductListQuery } from "@/entities/product";
import { buildDate } from "@/shared/lib/date";

export const useProductTableList = () => {
  const { isPending, isSuccess, isFetchedAfterMount, product } =
    useProductListQuery();

  const productList = product?.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    productList: productList ?? [],
  };
};
