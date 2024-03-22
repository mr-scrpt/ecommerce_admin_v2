import { useProductListQuery } from "../_query/productList.query";

// interface useProductListToSelectProps {}

export const useProductListToSelect = () => {
  const { data, isPending } = useProductListQuery();

  const productList = data?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return {
    productList,
    isPending,
  };
};
