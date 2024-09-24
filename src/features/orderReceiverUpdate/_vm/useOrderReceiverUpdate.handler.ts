import { useRouter } from "next/navigation";
import { useOrderReceiverUpdateMutation } from "../_mutation/useOrderRowUpdate.mutation";
import { OrderReceiverUpdateFormValues } from "../_domain/form.schema";

export interface OrderReceiverUpdateHandlerProps {
  selector: {
    orderId: string;
  };
  onSuccess?: () => void;
  callbackUrl?: string;
}

export const useOrderReceiverUpdateHandler = (
  props: OrderReceiverUpdateHandlerProps,
) => {
  const { selector, onSuccess, callbackUrl } = props;
  const { orderId } = selector;

  const {
    orderReceiverUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useOrderReceiverUpdateMutation();

  const router = useRouter();

  const handleOrderReceiverUpdate = async (
    data: OrderReceiverUpdateFormValues,
  ) => {
    const { orderReceiverList } = data;
    const [receiver] = orderReceiverList;
    await orderReceiverUpdate({
      selector: { id: orderId },
      orderReceiverData: { receiverId: receiver.value },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    handleOrderReceiverUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  };
};
