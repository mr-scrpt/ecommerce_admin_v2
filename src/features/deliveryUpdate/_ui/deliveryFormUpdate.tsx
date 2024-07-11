import { DeliveryFormElements, useDeliveryQuery } from "@/entities/delivery";
import { usePostOfficeListToSelectModel } from "@/entities/post";
import { useStoreListBySettltmentRefToSelectModel } from "@/entities/store";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import {
  DeliveryUpdateFormValues,
  deliveryUpdateFormSchema,
} from "../_domain/form.schema";
import { useDeliveryUpdateModel } from "../_vm/useDeliveryUpdate.model";
import { StoreSelectElement } from "@/entities/store/_ui/form/elements/storeSelectElement";
import { DeliveryUpdateFormElements } from "./form/elements/deliveryUpdateFormElements";
import { AddressBase } from "@/kernel/domain/address/address.type";
import { AddressCreateProps } from "@/kernel/domain/address/ui.type";

interface OrderDeliveryFormProps extends HTMLAttributes<HTMLDivElement> {
  deliveryId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
  addressModal: (props: AddressCreateProps) => void;
  // settlementRef?: string;
}

export const DeliveryFormUpdate: FC<OrderDeliveryFormProps> = (props) => {
  const { deliveryId, callbackUrl, className, onSuccess, addressModal } = props;

  const {
    delivery,
    isPending: isPendingDelivery,
    isFetchedAfterMount,
  } = useDeliveryQuery(deliveryId);
  console.log("output_log: getDelivery $$$$ =>>>", delivery);

  const router = useRouter();

  const { deliveryUpdate, isPending: isPendingUpdate } =
    useDeliveryUpdateModel();

  const handleSubmit = useCallback(
    async (deliveryData: DeliveryUpdateFormValues) => {
      console.log("output_log: data form =>>>", deliveryData);
      // TODO: add validation
      if (!delivery) {
        return;
      }
      await deliveryUpdate({
        selector: { id: delivery.id },
        deliveryData,
      });

      onSuccess?.();

      if (callbackUrl) {
        router.push(callbackUrl);
      }
    },
    [callbackUrl, delivery, deliveryUpdate, onSuccess, router],
  );

  // const { postOfficeListToSelect, isPending: isPendingPostOfficeList } =
  //   usePostOfficeListToSelectModel(delivery?.settlementRef || "");
  //
  // const { storeListToSelect, isPending: isPendingStore } =
  //   useStoreListBySettltmentRefToSelectModel(settlementRef);

  const isPendingComplexible =
    isPendingUpdate || isPendingDelivery || !isFetchedAfterMount;
  // ||
  // isPendingStore ||
  // isPendingPostOfficeList;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!delivery) {
    return <div>Failed to load delivery, you may not have permissions</div>;
  }

  return (
    <div className={cn(className, "w-full")}>
      <DeliveryUpdateFormElements
        handleSubmit={handleSubmit}
        addressModal={addressModal}
        delivery={delivery}
        schema={deliveryUpdateFormSchema}
      >
        <DeliveryUpdateFormElements.FieldSettlementSelect />
        <DeliveryUpdateFormElements.FieldDeliveryType />
        <DeliveryUpdateFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </DeliveryUpdateFormElements>
    </div>
  );
};
