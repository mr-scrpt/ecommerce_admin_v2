import { OrderForm, useOrderGroupQuery } from "@/entities/order";
import { FC, HTMLAttributes } from "react";
import { useOrderCreate } from "../_vm/useOrderCreate";

interface OrderCreateProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  // handleCreate: (data: OrderGroup) => void;
}

export const OrderCreate: FC<OrderCreateProps> = (props) => {
  const { orderId, className } = props;
  const { orderGroup, isPending, isSuccess } = useOrderGroupQuery(orderId);

  // const {
  //   orderCreate,
  //   isPending: isPendingCreate,
  //   isSuccess: isSuccessCreate,
  // } = useOrderCreateMutation();
  const { orderCreate, isSuccessCreate, isPendingCreate } =
    useOrderCreate(orderId);

  if (!orderGroup) return null;

  return (
    <OrderForm
      order={orderGroup}
      submitText="Create Order "
      handleSubmit={orderCreate}
      className={className}
    />
  );
};
