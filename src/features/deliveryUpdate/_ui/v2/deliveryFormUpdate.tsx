"use client";
import { DeliveryFormElements } from "@/entities/delivery";
import { FC, HTMLAttributes } from "react";
import { deliveryUpdateFormDefaultSchema } from "../../_domain/form.schema";
import { useDeliveryFormDefaultValues } from "../../_vm/useDeliveryFormDefaultValues.model";
import { SettlementFormElements } from "@/entities/settlement";
import { DeliveryFormUpdateElements } from "./deliveryFormUpdateElements";

interface DeliveryFormProps extends HTMLAttributes<HTMLDivElement> {
  // orderId: string;
  deliveryId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const DeliveryFormUpdate: FC<DeliveryFormProps> = (props) => {
  const { deliveryId, callbackUrl, className, onSuccess } = props;

  // const { isPending, delivery, isFetchedAfterMount } =
  //   useDeliveryWithRelationByOrderIdQuery(orderId);

  // const { postListToSelect } = usePostOfficeToSelectModel(
  //   "169227f4-e1c2-11e3-8c4a-0050568002cf",
  // );

  // const defaultValues = useDeliveryDefaultValues({ delivery });

  // if (!delivery) return null;
  //
  // const defaultValues = useDeliveryFormDefaultValues({ orderId });
  //
  const { defaultValues, isPending } = useDeliveryFormDefaultValues({
    deliveryId,
  });

  console.log("output_log: defaultValues =>>>", defaultValues);
  return (
    <DeliveryFormElements
      defaultValues={{ ...defaultValues }}
      schema={deliveryUpdateFormDefaultSchema}
    >
      <SettlementFormElements.FieldSettlementSelectSearch />
      <DeliveryFormElements.FieldDeliveryTypeSelect />
      <DeliveryFormUpdateElements.FieldDeliveryTypeRadioSection />
    </DeliveryFormElements>
  );
};
