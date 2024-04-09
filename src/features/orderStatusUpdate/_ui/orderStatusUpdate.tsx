import { OrderStatusForm, useOrderStatusGroupQuery } from "@/entities/order";
import { FC, HTMLAttributes } from "react";
import { useOrderUpdateStatus } from "../_vm/useOrderUpdateStatus";

interface OrderStatusUpdateProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  // handleUpdate: (data: OrderStatusGroup) => void;
}

export const OrderStatusUpdate: FC<OrderStatusUpdateProps> = (props) => {
  const { orderId, className } = props;
  const { orderStatusGroup, isPending, isSuccess } =
    useOrderStatusGroupQuery(orderId);

  // const {
  //   orderUpdateStatus,
  //   isPending: isPendingUpdate,
  //   isSuccess: isSuccessUpdate,
  // } = useOrderUpdateStatusMutation();
  const { orderUpdateStatus, isSuccessUpdate, isPendingUpdate } =
    useOrderUpdateStatus(orderId);

  if (!orderStatusGroup) return null;

  return (
    <OrderStatusForm
      orderStatus={orderStatusGroup}
      submitText="Update Order Status"
      handleSubmit={orderUpdateStatus}
      className={className}
    />
  );
};
