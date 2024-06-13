import { useProductListQuery } from "../_query/productList.query";

// interface useProductListToSelectProps {}

export const useProductListToSelect = () => {
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
