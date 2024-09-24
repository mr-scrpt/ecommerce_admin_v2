import { OrderFormElements } from "@/entities/order/_ui/order/form/orderFormElements";
import { FC, HTMLAttributes } from "react";
import { useOrderDefaultValues } from "../../_vm/useOrderDefaultValues.model";
import { useOrderUpdateHandler } from "../../_vm/useOrderUpdate.handler";

interface OrderUpdateFromProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const OrderUpdateForm: FC<OrderUpdateFromProps> = (props) => {
  const { orderId, className, callbackUrl, onSuccess } = props;

  const {
    orderUpdateValues,
    isPendingOrderData,
    isFetchedAfterMountOrderData,
    isSuccessOrderData,
  } = useOrderDefaultValues(orderId);

  const { handleOrderUpdate, isSuccessUpdate, isPendingUpdate } =
    useOrderUpdateHandler({ data: { orderId }, onSuccess, callbackUrl });

  const isPending =
    isPendingOrderData || isPendingUpdate || !isFetchedAfterMountOrderData;

  return (
    <OrderFormElements
      defaultValues={orderUpdateValues}
      handleSubmit={handleOrderUpdate}
    >
      <OrderFormElements.FieldOrderStatusStateSelect />
      <OrderFormElements.FieldOrderStatusPaymentSelect />
      <OrderFormElements.SubmitButton
        isPending={isPending}
        submitText="Update Order"
      />
    </OrderFormElements>
  );
};
