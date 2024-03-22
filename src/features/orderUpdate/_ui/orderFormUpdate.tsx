"use client";
import {
  OrderId,
  orderFormProductSchema,
  useOrderWithRelationQuery,
} from "@/entities/order";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useOrderAddRowMutation } from "../_mutation/useOrderAddRow.mutation";
import { OrderFormProductUpdate } from "./orderFormProductUpdate";

interface OrderFormProps extends HTMLAttributes<HTMLDivElement> {
  orderId: OrderId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type OrderFormValues = z.infer<typeof orderFormProductSchema>;

export const OrderFormUpdate: FC<OrderFormProps> = (props) => {
  const { orderId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingOrder,
    isFetchedAfterMount,
    order,
  } = useOrderWithRelationQuery(orderId);

  const { orderRowAdd, isPending: isPendingUpdate } = useOrderAddRowMutation();

  const isPendingComplexible =
    isPendingOrder || isPendingUpdate || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!order) {
    return <div>Failed to load order, you may not have permissions</div>;
  }

  const handleSubmit = async (data: OrderFormValues) => {
    await orderRowAdd({
      orderId: order.id,
      data: {
        productId: data.orderProductToAdd,
        quantity: 1,
      },
    });

    onSuccess?.();
  };

  return (
    <div className={cn(className, "w-full")}>
      <OrderFormProductUpdate
        orderProductList={order.orderRowList}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
