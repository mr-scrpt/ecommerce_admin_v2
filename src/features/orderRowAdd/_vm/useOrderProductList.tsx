import { useOrderWithRelationQuery } from "@/entities/order";
import { useProductListSearchQuery } from "@/entities/product";
import { ProductToSelect } from "@/entities/product/_domain/types";

export const useOrderProductListToSelect = (orderId: string) => {
  const {
    data: productData,
    isPending: isProductPending,
    searchValue,
    toSearch,
  } = useProductListSearchQuery();

  const { order, isPending: isOrderPending } =
    useOrderWithRelationQuery(orderId);

  const productList = productData?.map((item) => ({
    label: item.name,
    article: item.article,
    value: item.id,
    disabled: !!order?.orderRowList.find((row) => {
      return row.productId === item.id;
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
    isPending: isOrderPending || isProductPending || !order,
  };
};
