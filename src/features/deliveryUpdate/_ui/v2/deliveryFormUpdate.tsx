"use client";
import { DeliveryFormElements } from "@/entities/delivery";
import { SettlementFormElements } from "@/entities/settlement";
import { FC, HTMLAttributes, memo } from "react";
import { deliveryUpdateFormDefaultSchema } from "../../_domain/form.schema";
import { useDeliveryFormDefaultValues } from "../../_vm/useDeliveryFormDefaultValues.model";
import { DeliveryFormUpdateElements } from "./deliveryFormUpdateElements";
import { ReceiverFormElements } from "@/entities/receiver";

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
      defaultValues={{ ...defaultValues }}
      schema={deliveryUpdateFormDefaultSchema}
    >
      <SettlementFormElements.FieldSettlementSelectSearch />
      <DeliveryFormElements.FieldDeliveryTypeSelect />

      <DeliveryFormUpdateElements.FieldDeliveryTypeRadioSection
        deliveryId={deliveryId}
      />
      <ReceiverFormElements.FieldReceiverSelect userId={userId} />
    </DeliveryFormElements>
  );
});
