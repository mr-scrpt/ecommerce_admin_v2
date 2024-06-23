import { useProductListQuery } from "../_query/productList.query";

export const useProductListToSelectModel = () => {
  const { product, isPending } = useProductListQuery();

  const productList = product?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return {
    productList,
    isPending,
  };
};
