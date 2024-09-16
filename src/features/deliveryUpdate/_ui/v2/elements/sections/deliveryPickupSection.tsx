import { StoreFormElements } from "@/entities/store";
import { FC } from "react";
import { DeliveryCommonSectionProps } from "../../../../_domain/ui.type";

export const DeliveryPickupSection: FC<DeliveryCommonSectionProps> = (
  props,
) => {
  const { settlementRef } = props;
  return <StoreFormElements.FieldStoreSelect settlementRef={settlementRef} />;
};
