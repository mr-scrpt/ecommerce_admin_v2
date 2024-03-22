import { OrderRelation } from "@/entities/order";
import { OrderProduct } from "@/entities/order/";
import { useProductListByIdQuery } from "@/entities/product";

export const useOrderProductList = (order?: OrderRelation) => {
  const productListId = order?.orderRowList.map((item) => item.productId);
  const { isPending, isSuccess, data } = useProductListByIdQuery(
    productListId ?? [],
  );

  const orderProductList: Array<OrderProduct> = data.map((item) => ({
    ...item,
    orderPrice: order?.orderRowList.find((row) => row.productId === item.id)
      ?.price,
    quantity: order?.orderRowList.find((row) => row.productId === item.id)
      ?.quantity,
  }));

  const priceTotal = order?.orderRowList.reduce(
    (acc, item) => acc + item.price,
    0,
  );

  return {
    orderProductList,
    priceTotal,
    isPending,
    isSuccess,
  };
};
