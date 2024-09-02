"use client";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";
import { OrderUpdateDeliveryItem } from "./delivery/orderUpdateDeliveryItem";
import { OrderUpdateProductItem } from "./products/orderUpdateProductItem";
import { OrderDeliveryItem } from "./orderDeliveryItem";

interface OrderUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  orderId: string;
}

export const OrderUpdate: FC<OrderUpdateProps> = (props) => {
  const { callbackUrl, orderId } = props;
  return (
    <>
      {/* <OrderDeliveryItem orderId={orderId} /> */}

      <OrderUpdateDeliveryItem orderId={orderId} />
      {/* <OrderDeliveryItem orderId={orderId} /> */}
      {/* <OrderUpdateProductItem orderId={orderId} /> */}
    </>
  );
};
