import { useRouter } from "next/navigation";
import { DeliveryUpdateFormValues } from "../_domain/form.schema";
import { useDeliveryUpdateMutation } from "../_mutation/useDeliveryUpdate.mutation";

export interface DeliveryUpdateHandlerProps {
  data: {
    deliveryId: string;
  };
  onSuccess?: () => void;
  callbackUrl?: string;
}

export const useDeliveryUpdateHandler = (props: DeliveryUpdateHandlerProps) => {
  const { data, onSuccess, callbackUrl } = props;
  const { deliveryId } = data;

  const {
    deliveryUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useDeliveryUpdateMutation();

  const router = useRouter();

  const handleDeliveryUpdate = async (data: DeliveryUpdateFormValues) => {
    const { deliveryType, settlement, storeList, addressList, postOfficeList } =
      data;

    if (!deliveryType) {
      return;
    }

    const [store] = storeList;
    const [address] = addressList;
    const [postOffice] = postOfficeList;

    await deliveryUpdate({
      selector: { id: deliveryId },
      deliveryData: {
        deliveryTypeId: deliveryType.value,

        settlementRef: settlement?.value ?? null,
        storeId: store?.value ?? null,
        addressId: address?.value ?? null,

        postOfficeId: postOffice?.value ?? null,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    handleDeliveryUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  };
};
