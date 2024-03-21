import { FC, HTMLAttributes } from "react";
import { orderRowToProductListId } from "../_lib/orderRowToProductListId";
import { OrderRow } from "../_domain/types";
import { OrderProductSnippet } from "./orderProductSnippet";

interface OrderProductListProps extends HTMLAttributes<HTMLDivElement> {
  orderProductRowList: Array<OrderRow>;
  // ProductListComp: FC<{ productListId: Array<string> }>;
}

export const OrderProductList: FC<OrderProductListProps> = (props) => {
  const { orderProductRowList } = props;
  // const productListId = orderRowToProductListId(orderProductRowList);
  return (
    <div className="flex w-full flex-col gap-4">
      {orderProductRowList.map((orderRow) => (
        <div key={orderRow.id} className="flex w-full flex-row">
          <OrderProductSnippet product={orderRow} />
          <div className="flex flex-grow items-center gap-4 p-4">
            <div>Cout: {orderRow.quantity}</div>
            <div>Total: {orderRow.quantity * orderRow.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
