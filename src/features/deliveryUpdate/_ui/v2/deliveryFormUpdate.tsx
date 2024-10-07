"use client";
import { DeliveryFormElements } from "@/entities/delivery";
import { SettlementFormElements } from "@/entities/settlement";
import { FC, HTMLAttributes, memo } from "react";
import { deliveryUpdateFormSchema } from "../../_domain/form.schema";
import { useDeliveryFormDefaultValues } from "../../_vm/useDeliveryFormDefaultValues.model";
import { useDeliveryUpdateHandler } from "../../_vm/useDeliveryUpdate.handler";
import { DeliveryFormUpdateElements } from "./deliveryFormUpdateElements";

interface DeliveryFormProps extends HTMLAttributes<HTMLDivElement> {
  deliveryId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const DeliveryFormUpdate: FC<DeliveryFormProps> = memo((props) => {
  const { deliveryId, callbackUrl, className, onSuccess } = props;

  const { defaultValues, isPending } = useDeliveryFormDefaultValues({
    deliveryId,
  });

  const { handleDeliveryUpdate, isPendingUpdate, isSuccessUpdate } =
    useDeliveryUpdateHandler({ data: { deliveryId }, onSuccess, callbackUrl });

  return (
    <DeliveryFormElements
      defaultValues={defaultValues}
      schema={deliveryUpdateFormSchema}
      handleSubmit={handleDeliveryUpdate}
    >
      <SettlementFormElements.FieldSettlementSelectSearch />
      <DeliveryFormElements.FieldDeliveryTypeSelect />

      <DeliveryFormUpdateElements.FieldDeliveryTypeRadioSection
        deliveryId={deliveryId}
      />
      <DeliveryFormElements.SubmitButton
        isPending={isPending || isPendingUpdate}
        className={className}
        submitText="Update Delivery"
      />
    </DeliveryFormElements>
  );
});

DeliveryFormUpdate.displayName = "DeliveryFormUpdate";
