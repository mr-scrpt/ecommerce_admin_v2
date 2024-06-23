import { OrderStatusForm, useOrderStatusGroupModel } from "@/entities/order";
import { FC, HTMLAttributes } from "react";
// import { useOrderUpdateStatusMutation } from "../_mutation/useOrderStatusUpdate.mutation";
import { useOrderUpdateStatusMutation } from "../_mutation/useOrderStatusUpdate.mutation";
import { useOrderUpdateStatusModel } from "../_vm/useOrderUpdateStatus.model";

interface OrderStatusUpdateProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  // handleUpdate: (data: OrderStatusGroup) => void;
}

export const OrderStatusUpdate: FC<OrderStatusUpdateProps> = (props) => {
  const { orderId, className } = props;
  // const { orderStatusGroup, isPending, isSuccess } =
  //   useOrderStatusGroupQuery(orderId);
  const { orderStatusGroup, isSuccess, isPending } =
    useOrderStatusGroupModel(orderId);

  // const {
  //   orderUpdateStatus,
  //   isPending: isPendingUpdate,
  const { orderUpdateStatus, isSuccessUpdate, isPendingUpdate } =
    useOrderUpdateStatusModel(orderId);
  // const {
  //   orderUpdateStatus,
  //   isSuccess: isSuccessUpdate,
  //   isPending: isPendingUpdate,
  // } = useOrderUpdateStatusMutation(orderId);

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
