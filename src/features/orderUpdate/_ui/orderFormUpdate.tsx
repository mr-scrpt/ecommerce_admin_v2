"use client";
import {
  OrderFormLayout,
  OrderId,
  orderFormSchema,
  useOrderWithRelationQuery,
} from "@/entities/order";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { z } from "zod";
import { useOrderUpdateMutation } from "../_mutation/useOrderUpdate.mutation";
import { ProductList } from "@/entities/product";

interface OrderFormProps extends HTMLAttributes<HTMLDivElement> {
  orderId: OrderId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

type OrderFormValues = z.infer<typeof orderFormSchema>;

export const OrderFormUpdate: FC<OrderFormProps> = (props) => {
  const { orderId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingOrder,
    isFetchedAfterMount,
    order,
  } = useOrderWithRelationQuery(orderId);

  const router = useRouter();

  const { orderUpdate, isPending: isPendingUpdate } = useOrderUpdateMutation();

  const isPendingComplexible =
    isPendingOrder || isPendingUpdate || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!order) {
    return <div>Failed to load order, you may not have permissions</div>;
  }

  const handleSubmit = async (data: OrderFormValues) => {
    await orderUpdate({
      orderId: order.id,
      data: {
        ...data,
        id: order.id,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <OrderFormLayout
        isPending={isPendingComplexible}
        order={order}
        handleSubmit={handleSubmit}
        submitText="Update"
        ProductListComp={ProductList}
      />
    </div>
  );
};
