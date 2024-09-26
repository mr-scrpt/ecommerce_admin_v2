import { useRouter } from "next/navigation";
import { OrderRowCreateFormValues } from "../_domain/form.schema";
import { useOrderRowCreateMutation } from "../_mutation/useOrderRowCreate.mutation";

export interface OrderRowCreateHandlerProps {
  data: {
    orderId: string;
  };
  onSuccess?: () => void;
  callbackUrl?: string;
}

export const useOrderRowCreateHandler = (props: OrderRowCreateHandlerProps) => {
  const { data, onSuccess, callbackUrl } = props;
  const { orderId } = data;

  const {
    orderRowCreate: orderRowAdd,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useOrderRowCreateMutation();

  const router = useRouter();

  const handleOrderRowCreate = async (data: OrderRowCreateFormValues) => {
    const { product, quantity } = data;
    const { value: productId } = product;
    await orderRowAdd({
      selector: {
        orderId,
      },
      orderRowData: {
        productId,
        quantity,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    handleOrderRowCreate,
    isPendingCreate,
    isSuccessCreate,
  };
};
