"use client";
import {
  OrderId,
  OrderProductList,
  OrderRowChangeQuantity,
  useOrderWithRelationQuery,
} from "@/entities/order";
import { Spinner } from "@/shared/ui/icons/spinner";
import { FC, HTMLAttributes } from "react";

interface OrderFormProps extends HTMLAttributes<HTMLDivElement> {
  orderId: OrderId;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
  orderRowUpdateQuantity: (params: OrderRowChangeQuantity) => void;
}

export const OrderRowList: FC<OrderFormProps> = (props) => {
  const { orderId, orderRowUpdateQuantity } = props;

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
    <OrderProductList
      orderProductRowList={order.orderRowList}
      updateQuantity={orderRowUpdateQuantity}
    />
  );
};
