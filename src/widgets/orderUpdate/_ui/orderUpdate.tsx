"use client";
import { OrderStatusForm } from "@/entities/order";
import { OrderRowAdd } from "@/features/orderRowAdd";
import { OrderRowList } from "@/features/orderRowList";
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

  return (
    <div className="flex w-full flex-col gap-4">
      <OrderStatusUpdate orderId={orderId} />
      <OrderRowAdd orderId={orderId} />
      <OrderRowList
        orderId={orderId}
        orderRowUpdateQuantity={orderRowUpdateQuantity}
        orderRowRemove={removeOrderConfirm}
      />
    </div>
  );
};
