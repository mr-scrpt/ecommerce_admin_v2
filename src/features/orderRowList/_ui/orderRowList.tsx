"use client";
import {
  OrderProductList,
  OrderRelation,
  OrderRowToUpdateQuantityPayload,
} from "@/entities/order";
import { FC, HTMLAttributes } from "react";

interface OrderRowListProps extends HTMLAttributes<HTMLDivElement> {
  order: OrderRelation;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
  handleOrderRowUpdateQuantity: (
    params: OrderRowToUpdateQuantityPayload,
  ) => void;
  handleOrderRowRemove: (orderRowId: string) => void;
}

export const OrderRowList: FC<OrderRowListProps> = (props) => {
  const {
    order,
    handleOrderRowUpdateQuantity,
    handleOrderRowRemove,
    className,
  } = props;

  return (
    <OrderProductList
      orderProductRowList={order.orderRowList}
      handleOrderRowUpdateQuantity={handleOrderRowUpdateQuantity}
      handleOrderRowRemove={handleOrderRowRemove}
      className={className}
    />
  );
};
