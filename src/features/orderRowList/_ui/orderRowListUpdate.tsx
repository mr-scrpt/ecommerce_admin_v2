"use client";
import {
  OrderId,
  OrderRowToUpdateQuantityPayload,
  useOrderWithRelationQuery,
} from "@/entities/order";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC, HTMLAttributes } from "react";
import { OrderRowList } from "./orderRowList";

interface OrderRowListUpdateProps extends HTMLAttributes<HTMLDivElement> {
  orderId: OrderId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
  orderRowUpdateQuantity: (params: OrderRowToUpdateQuantityPayload) => void;
  orderRowRemove: (orderRowId: string) => void;
}

export const OrderRowListUpdate: FC<OrderRowListUpdateProps> = (props) => {
  const { orderId, orderRowUpdateQuantity, orderRowRemove, className } = props;

  const {
    isPending: isPendingOrder,
    isFetchedAfterMount,
    order,
  } = useOrderWithRelationQuery(orderId);

  const isPendingComplexible = isPendingOrder || !isFetchedAfterMount;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!order) {
    return <div>Failed to load order, you may not have permissions</div>;
  }

  return (
    <OrderRowList
      className={className}
      order={order}
      handleOrderRowUpdateQuantity={orderRowUpdateQuantity}
      handleOrderRowRemove={orderRowRemove}
    />
  );
};
