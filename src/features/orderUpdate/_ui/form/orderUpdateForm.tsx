import { useOrderWithRelationModel } from "@/entities/order";
import { OrderFormElements } from "@/entities/order/_ui/order/form/orderFormElements";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { OrderUpdateFormValues } from "../../_domain/form.schema";
import { useOrderUpdateMutation } from "../../_mutation/useOrderUpdate.mutation";
import { useOrderDefaultValues } from "../../_vm/useOrderDefaultValues.model";

interface OrderUpdateFromProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const OrderUpdateForm: FC<OrderUpdateFromProps> = (props) => {
  const { orderId, className, callbackUrl, onSuccess } = props;

  const { order, isSuccess, isPending } = useOrderWithRelationModel(orderId);

  const router = useRouter();

  // TODO: add UI

  if (!order) {
    return null;
  }

  const defaultValues = useOrderDefaultValues(order);

  const { orderUpdate } = useOrderUpdateMutation();

  const handleSubmit = async (data: OrderUpdateFormValues) => {
    const { orderStatusStateList, orderStatusPaymentList } = data;
    const [orderStatusData] = orderStatusStateList;
    const [orderPaymentStatusData] = orderStatusPaymentList;

    await orderUpdate({
      selector: { id: orderId },
      orderStatusStateData: { id: orderStatusData.value },
      orderStatusPaymentData: { id: orderPaymentStatusData.value },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <OrderFormElements
      defaultValues={defaultValues}
      handleSubmit={handleSubmit}
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
