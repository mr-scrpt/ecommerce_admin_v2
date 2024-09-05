"use client";
import { DeliveryFormElements } from "@/entities/delivery";
import { useDeliveryWithRelationByOrderIdQuery } from "@/entities/delivery/_query/deliveryWithRelationByOrderId.query";
import { SettlementFormElements } from "@/entities/settlement/_ui/form/settlementFromElements";
import { FC, HTMLAttributes } from "react";
import { deliveryUpdateFormSchema } from "../../_domain/form.schema";
import { useDeliveryDefaultValues } from "../../_vm/useDeliveryDefaultValues.model";

interface DeliveryFormProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const DeliveryFormUpdate: FC<DeliveryFormProps> = (props) => {
  const { orderId, callbackUrl, className, onSuccess } = props;

  const { isPending, delivery, isFetchedAfterMount } =
    useDeliveryWithRelationByOrderIdQuery(orderId);

  const defaultValues = useDeliveryDefaultValues({ delivery });

  if (!delivery) return null;

  return (
    <DeliveryFormElements
      defaultValues={{ ...defaultValues }}
      schema={deliveryUpdateFormSchema}
    >
      <SettlementFormElements.FieldSettlementSelectSearch />
      <DeliveryFormElements.FieldDeliveryTypeSelect />
      <DeliveryFormElements.FieldDeliveryTypeRadio />
    </DeliveryFormElements>
  );
};
