"use client";
import {
  OrderProductList,
  OrderRow,
  OrderRowToUpdateQuantityPayload,
} from "@/entities/order";
import { FC, HTMLAttributes } from "react";

interface OrderFormProps extends HTMLAttributes<HTMLDivElement> {
  orderRowList: Array<OrderRow>;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
  handleOrderRowUpdateQuantity: (
    params: OrderRowToUpdateQuantityPayload,
  ) => void;
  handleOrderRowRemove: (orderRowId: string) => void;
}

export const OrderRowListCreate: FC<OrderFormProps> = (props) => {
  const {
    orderRowList,
    handleOrderRowUpdateQuantity,
    handleOrderRowRemove,
    className,
  } = props;

  return (
    <OrderProductList
      orderProductRowList={orderRowList}
      handleOrderRowUpdateQuantity={handleOrderRowUpdateQuantity}
      handleOrderRowRemove={handleOrderRowRemove}
      className={className}
    />
  );
};
