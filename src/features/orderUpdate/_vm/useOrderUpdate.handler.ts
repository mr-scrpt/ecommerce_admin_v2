import { useRouter } from "next/navigation";
import { useOrderUpdateMutation } from "../_mutation/useOrderUpdate.mutation";
import { OrderUpdateFormValues } from "../_domain/form.schema";

export interface OrderUpdateHandlerProps {
  data: {
    orderId: string;
  };
  onSuccess?: () => void;
  callbackUrl?: string;
}
export const useOrderUpdateHandler = (props: OrderUpdateHandlerProps) => {
  const { data, onSuccess, callbackUrl } = props;
  const { orderId } = data;

  const {
    orderUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useOrderUpdateMutation();

  const router = useRouter();

  const handleOrderUpdate = async (data: OrderUpdateFormValues) => {
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

  return {
    handleOrderUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  };
};
