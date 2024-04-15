"use client";
import {
  useDeliveryByOrderIdQuery,
  useDeliveryQuery,
} from "@/entities/delivery";
import { DeliveryFormUpdate } from "@/features/orderDeliveryUpdate";
import { OrderOwnerData } from "@/features/orderOwnerData";
import { OrderRowAdd } from "@/features/orderRow";
import { OrderRowListUpdate } from "@/features/orderRowList";
import { useOrderRemoveConfirm } from "@/features/orderRowRemove";
import { useOrderRowUpdateQuantityMutation } from "@/features/orderRowUpdate/_mutation/useOrderRowUpdateQuantity.mutation";
import { OrderStatusUpdate } from "@/features/orderStatusUpdate";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";

interface OrderUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  orderId: string;
}

export const OrderUpdate: FC<OrderUpdateProps> = (props) => {
  const { callbackUrl, orderId } = props;

  const { orderRowUpdateQuantity } = useOrderRowUpdateQuantityMutation();
  const { removeOrderConfirm, isPending, isSuccess } = useOrderRemoveConfirm();

  const { delivery } = useDeliveryByOrderIdQuery(orderId);

  return (
    <div className="flex w-full flex-col gap-4">
      <OrderOwnerData orderId={orderId}>
        <OrderOwnerData.OwnerInfo className="flex w-full border p-4" />
        <OrderOwnerData.OrderInfo className="flex w-full border p-4" />
      </OrderOwnerData>
      <OrderStatusUpdate orderId={orderId} className="flex w-full border p-4" />
      <OrderRowAdd orderId={orderId} className="flex w-full border p-4" />
      <OrderRowListUpdate
        orderId={orderId}
        orderRowUpdateQuantity={orderRowUpdateQuantity}
        orderRowRemove={removeOrderConfirm}
        className="flex w-full border p-4"
      />
      <DeliveryFormUpdate orderId={orderId} />
    </div>
  );
};
