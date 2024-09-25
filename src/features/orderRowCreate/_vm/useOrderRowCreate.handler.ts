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

  // const {
  //   orderRowCreate,
  //   isPending: isPendingUpdate,
  //   isSuccess: isSuccessUpdate,
  // } = useOrderRowCreateMutation();
  const {
    orderRowCreate: orderRowAdd,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useOrderRowCreateMutation();

  const router = useRouter();

  const handleOrderRowCreate = async (data: OrderRowCreateFormValues) => {
    await orderRowAdd({
      selector: {
        orderId,
      },
      orderRowData: {
        productId: data.product.value,
        quantity: 1,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };
  // const handleOrderRowCreate = async (data: OrderRowCreateFormValues) => {
  //   const { propertyList, ...orderRowData } = data;
  //   await orderRowCreate({
  //     selector: { id: orderRowId },
  //     orderRowData,
  //     propertyData: propertyList.map(({ value }) => ({ propertyId: value })),
  //   });
  //
  //   onSuccess?.();
  //
  //   if (callbackUrl) {
  //     router.push(callbackUrl);
  //   }
  // };

  return {
    handleOrderRowCreate,
    isPendingUpdate,
    isSuccessUpdate,
  };
};
