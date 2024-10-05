import { OrderFormElements } from "@/entities/order/_ui/order/form/orderFormElements";
import { FC, HTMLAttributes } from "react";
import { useOrderUpdateHandler } from "../../_vm/useOrderUpdate.handler";
import { useOrderUpdateValues } from "../../_vm/useOrderUpdateValues.model";

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
    isSuccessOrder,
    isAppearancePendingOrder,
    isFetchedAfterMountOrder,
  } = useOrderUpdateValues(orderId);

  const { handleOrderUpdate, isSuccessUpdate, isPendingUpdate } =
    useOrderUpdateHandler({ data: { orderId }, onSuccess, callbackUrl });

  const isPending =
    isAppearancePendingOrder || isPendingUpdate || !isFetchedAfterMountOrder;

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
