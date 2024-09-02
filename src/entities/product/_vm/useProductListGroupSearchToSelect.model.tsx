import { ProductToSelect } from "../_domain/product.types";
import { useProductListSearchQuery } from "../_query/productListSearch.query";

export const useProductListGroupSearchToSelectModel = (
  productInOrder: Array<string>,
) => {
  const { productList, isPending, searchValue, toSearch } =
    useProductListSearchQuery();

  const productListSearch = productList?.map((item) => ({
    label: item.name,
    article: item.article,
    value: item.id,
    inStock: !!item.inStock,
    disabled: !!productInOrder.find((id) => {
      return id === item.id;
    }),
  }));

  const productListAvailable: Array<ProductToSelect> = [];
  const productListInOrder: Array<ProductToSelect> = [];
  const productListOutOfStock: Array<ProductToSelect> = [];

  productListSearch.forEach((product) => {
    if (product.disabled) {
      productListInOrder.push(product);
    } else if (!product.inStock) {
      productListOutOfStock.push(product);
    } else {
      productListAvailable.push(product);
    }
  });

  return {
    productGroup: {
      available: productListAvailable,
      inOrder: productListInOrder,
      outOfStock: productListOutOfStock,
    },
    toSearch,
    searchValue,
    isPending,
  };
};
