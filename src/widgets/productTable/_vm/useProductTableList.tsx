import { ProductId, useProductListQuery } from "@/entities/product";
import { buildDate } from "@/shared/lib/date";

export const useProductTableList = (productId: ProductId) => {
  const { isPending, isSuccess, data } = useProductListQuery(productId);

  const productList = data?.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    productList: productList ?? [],
  };
};
