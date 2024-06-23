"use client";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";
import { OrderConsumerItem } from "./orderConsumerItem";
import { OrderDeliveryItem } from "./orderDeliveryItem";
import { OrderGeneralItem } from "./orderGeneralItem";
import { OrderUpdateLayout } from "./orderUpdateLayout";

interface OrderUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  orderId: string;
}

export const OrderUpdate: FC<OrderUpdateProps> = (props) => {
  const { callbackUrl, orderId } = props;

  return (
    <OrderUpdateLayout
      slotGeneral={<OrderGeneralItem orderId={orderId} />}
      slotDelivery={<OrderDeliveryItem orderId={orderId} />}
      slotConsumer={<OrderConsumerItem orderId={orderId} />}
    />
  );
};
