import { useDeliveryQuery } from "@/entities/delivery";
import { AddressCreateProps } from "@/kernel/domain/address/ui.type";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import {
  DeliveryUpdateFormValues,
  deliveryUpdateFormSchema,
} from "../_domain/form.schema";
import { useDeliveryUpdateModel } from "../_vm/useDeliveryUpdate.model";
import { DeliveryUpdateFormElements } from "./form/elements/deliveryUpdateFormElements";
import { ReceiverCreateProps } from "@/kernel/domain/receiver/ui.type";
import { useAppearanceDelay } from "@/shared/lib/react";

interface OrderDeliveryFormProps extends HTMLAttributes<HTMLDivElement> {
  deliveryId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
  addressAddModal: (props: AddressCreateProps) => void;
  receiverAddModal: (props: ReceiverCreateProps) => void;
}

export const DeliveryFormUpdate: FC<OrderDeliveryFormProps> = (props) => {
  const {
    deliveryId,
    callbackUrl,
    className,
    onSuccess,
    addressAddModal,
    receiverAddModal,
  } = props;

  const {
    delivery,
    isPending: isPendingDelivery,
    isFetchedAfterMount,
    isSuccess,
  } = useDeliveryQuery(deliveryId);

  const router = useRouter();

  const { deliveryUpdate, isPending: isPendingUpdate } =
    useDeliveryUpdateModel();

  const handleSubmit = useCallback(
    async (deliveryData: DeliveryUpdateFormValues) => {
      // TODO: add validation
      // if (!delivery) {
      //   return;
      // }
      // await deliveryUpdate({
      //   selector: { id: delivery.id },
      //   deliveryData,
      // });
      //
      // onSuccess?.();
      //
      // if (callbackUrl) {
      //   router.push(callbackUrl);
      // }
    },
    [callbackUrl, delivery, deliveryUpdate, onSuccess, router],
  );

  const isPendingComplexible = useAppearanceDelay(
    isPendingUpdate || isPendingDelivery || !isFetchedAfterMount,
  );

  if (!delivery) {
    return <div>Failed to load delivery, you may not have permissions</div>;
  }

  return (
    <div className={cn(className, "w-full")}>
      <DeliveryUpdateFormElements
        handleSubmit={handleSubmit}
        addressAddModal={addressAddModal}
        receiverAddModal={receiverAddModal}
        delivery={delivery}
        schema={deliveryUpdateFormSchema}
      >
        <DeliveryUpdateFormElements.FieldSettlementSelect />
        <DeliveryUpdateFormElements.FieldDeliveryType />
        <DeliveryUpdateFormElements.FieldReceiverSelect />
        <DeliveryUpdateFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </DeliveryUpdateFormElements>
    </div>
  );
};
