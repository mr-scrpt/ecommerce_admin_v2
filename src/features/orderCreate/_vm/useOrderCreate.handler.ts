import { useRouter } from "next/navigation";
import { OrderCreateFormValues } from "../_domain/form.schema";
import { useOrderCreateMutation } from "../_mutation/useCreate.mutation";

export const useOrderCreateHandler = (
  callbackUrl: string,
  onSuccess?: () => void,
) => {
  const {
    orderCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useOrderCreateMutation();

  const router = useRouter();

  const handleOrderCreate = async (data: OrderCreateFormValues) => {
    const { consumer } = data;

    const order = await orderCreate({
      orderData: {
        userId: consumer.value,
      },
    });
    console.log("output_log: ORDER =>>>", order);

    onSuccess?.();

    if (callbackUrl) {
      router.push(`${callbackUrl}/${order.id}`);
    }
  };

  return {
    handleOrderCreate,
    isPendingCreate,
    isSuccessCreate,
  };
};
