"use client";
import {
  DeliveryFormElements,
  useDeliveryByOrderIdQuery,
  useDeliveryQuery,
} from "@/entities/delivery";
import { FC, HTMLAttributes } from "react";
import { useDeliveryDefaultValues } from "../../_vm/useDeliveryDefaultValues.model";
import { SettlementFromElements } from "@/entities/settlement";
import { SettlementFormElements } from "@/entities/settlement/_ui/form/settlementFromElements";
import { useDeliveryWithRelationByOrderIdQuery } from "@/entities/delivery/_query/deliveryWithRelationByOrderId.query";
import { deliveryUpdateFormSchema } from "../../_domain/form.schema";

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

  // if (!delivery) return null;

  return (
    <DeliveryFormElements
      defaultValues={defaultValues}
      schema={deliveryUpdateFormSchema}
    >
      <DeliveryFormElements.FieldDeliveryTypeSelect />
      <SettlementFormElements.FieldSettlementSelectSearch />
    </DeliveryFormElements>
  );
};