"use client";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";
import { OrderUpdateDeliveryItem } from "./delivery/orderUpdateDeliveryItem";
import { OrderUpdateReceiverItem } from "./receiver/orderUpdateReceiverItem";
import { OrderUpdateProductItem } from "./products/orderUpdateProductItem";

interface OrderUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  orderId: string;
}

export const OrderUpdate: FC<OrderUpdateProps> = (props) => {
  const { callbackUrl, orderId } = props;
  return (
    <>
      {/* <OrderDeliveryItem orderId={orderId} /> */}

      {/* <OrderUpdateStatusItem orderId={orderId} /> */}
      {/* <OrderUpdateProductItem orderId={orderId} /> */}
      <OrderUpdateDeliveryItem orderId={orderId} />
      <OrderUpdateReceiverItem orderId={orderId} />

      {/* <OrderDeliveryItem orderId={orderId} /> */}
      <OrderUpdateProductItem orderId={orderId} />
    </>
  );
};
