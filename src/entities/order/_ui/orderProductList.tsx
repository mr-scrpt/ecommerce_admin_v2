import { FC, HTMLAttributes } from "react";
import { orderRowToProductListId } from "../_lib/orderRowToProductListId";
import { OrderRow } from "../_domain/types";

interface OrderProductListProps extends HTMLAttributes<HTMLDivElement> {
  orderProductRowList: Array<OrderRow>;
  ProductListComp: FC<{ productListId: Array<string> }>;
}

export const OrderProductList: FC<OrderProductListProps> = (props) => {
  const { orderProductRowList, ProductListComp } = props;
  const productListId = orderRowToProductListId(orderProductRowList);
  return (
    <div>
      <ProductListComp productListId={productListId} />
    </div>
  );
};
