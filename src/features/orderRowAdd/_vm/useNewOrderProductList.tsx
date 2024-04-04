import { ProductToSelect, useProductListSearchQuery } from "@/entities/product";

export const useNewOrderProductListToSelect = (
  productIdList: Array<string>,
) => {
  const {
    data: productData,
    isPending: isProductPending,
    searchValue,
    toSearch,
  } = useProductListSearchQuery();

  const productList = productData?.map((item) => ({
    label: item.name,
    article: item.article,
    value: item.id,
    disabled: !!productIdList.find((row) => {
      return row === item.id;
    }),
    inStock: !!item.inStock,
  }));

  const productListAvailable: Array<ProductToSelect> = [];
  const productListInOrder: Array<ProductToSelect> = [];
  const productListOutOfStock: Array<ProductToSelect> = [];

  productList.forEach((product) => {
    if (product.disabled) {
      productListInOrder.push(product);
    } else if (!product.inStock) {
      productListOutOfStock.push(product);
    } else {
      productListAvailable.push(product);
    }
  });

  return {
    toSearch,
    searchValue,
    productList,
    productGroup: {
      available: productListAvailable,
      inOrder: productListInOrder,
      outOfStock: productListOutOfStock,
    },
    isPending: isProductPending,
  };
};
