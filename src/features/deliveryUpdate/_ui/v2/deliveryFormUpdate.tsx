"use client";
import { DeliveryFormElements } from "@/entities/delivery";
import { ReceiverFormElements } from "@/entities/receiver";
import { SettlementFormElements } from "@/entities/settlement";
import { FC, HTMLAttributes, memo } from "react";
import { deliveryUpdateFormSchema } from "../../_domain/form.schema";
import { useDeliveryFormDefaultValues } from "../../_vm/useDeliveryFormDefaultValues.model";
import { DeliveryFormUpdateElements } from "./deliveryFormUpdateElements";

interface DeliveryFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  deliveryId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const DeliveryFormUpdate: FC<DeliveryFormProps> = memo((props) => {
  const { deliveryId, userId, callbackUrl, className, onSuccess } = props;

  const { defaultValues, isPending } = useDeliveryFormDefaultValues({
    deliveryId,
  });

  return (
    <DeliveryFormElements
      defaultValues={defaultValues}
      schema={deliveryUpdateFormSchema}
    >
      <SettlementFormElements.FieldSettlementSelectSearch />
      <DeliveryFormElements.FieldDeliveryTypeSelect />

      <DeliveryFormUpdateElements.FieldDeliveryTypeRadioSection
        deliveryId={deliveryId}
      />
      {/* <ReceiverFormElements.FieldReceiverSelect userId={userId} /> */}
    </DeliveryFormElements>
  );
});
