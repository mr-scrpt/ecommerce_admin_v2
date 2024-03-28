import { FC, HTMLAttributes } from "react";
import {
  OrderRow,
  OrderRowToUpdateQuantityPayload,
} from "../_domain/orderRow.types";
import { OrderProductSnippet } from "./orderProductSnippet";
import { cn } from "@/shared/ui/utils";

interface OrderProductListProps extends HTMLAttributes<HTMLDivElement> {
  orderProductRowList: Array<OrderRow>;
  updateQuantity: (params: OrderRowToUpdateQuantityPayload) => void;
  orderRowRemove: (orderRowId: string) => void;
}

export const OrderProductList: FC<OrderProductListProps> = (props) => {
  const { orderProductRowList, updateQuantity, orderRowRemove, className } =
    props;
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
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
            orderRowRemove={() => orderRowRemove(orderRow.id)}
          />
        </div>
      ))}
    </div>
  );
};
