import { FC, HTMLAttributes } from "react";
import {
  OrderRow,
  OrderRowChangeQuantityPayload,
} from "../_domain/orderRow.types";
import { OrderProductSnippet } from "./orderProductSnippet";

interface OrderProductListProps extends HTMLAttributes<HTMLDivElement> {
  orderProductRowList: Array<OrderRow>;
  updateQuantity: (params: OrderRowChangeQuantityPayload) => void;
}

export const OrderProductList: FC<OrderProductListProps> = (props) => {
  const { orderProductRowList, updateQuantity } = props;
  return (
    <div className="flex w-full flex-col gap-4">
      {orderProductRowList.map((orderRow) => (
        <div key={orderRow.id} className="flex w-full flex-row">
          <OrderProductSnippet
            orderRow={orderRow}
            applayChangeQuantity={(value) => {
              return updateQuantity({
                productId: orderRow.productId,
                orderRowId: orderRow.id,
                quantity: value,
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};
