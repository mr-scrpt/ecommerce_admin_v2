import { OrderStatusForm, useOrderStatusGroupQuery } from "@/entities/order";
import { OrderStatusGroup } from "@/entities/order/_domain/order.types";
import { FC, HTMLAttributes } from "react";

interface OrderStatusUpdateProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  handleUpdate: (data: OrderStatusGroup) => void;
}

export const OrderStatusUpdate: FC<OrderStatusUpdateProps> = (props) => {
  const { orderId, handleUpdate } = props;
  const { orderStatusGroup, isPending, isSuccess } =
    useOrderStatusGroupQuery(orderId);

  if (!orderStatusGroup) return null;

  return (
    <OrderStatusForm
      orderStatus={orderStatusGroup}
      submitText="Update"
      handleSubmit={handleUpdate}
    />
  );
};
