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

  const { deliveryUpdate, isPending: isPendingUpdate } =
    useDeliveryUpdateMutation();

  const router = useRouter();

  const handleDeliveryUpdate = async (data: DeliveryUpdateFormValues) => {
    const { deliveryType, settlement, storeList, addressList, postOfficeList } =
      data;
    await deliveryUpdate({
      selector: { id: deliveryId },
      deliveryData: {
        // userId: data.userId,
        deliveryTypeId: deliveryType?.value ?? null,

        settlementRef: data.settlement?.value ?? null,
        storeId,
        addressId,

        postOfficeId,
      },
      // deliveryData,
      // propertyData: propertyList.map(({ value }) => ({ propertyId: value })),
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
