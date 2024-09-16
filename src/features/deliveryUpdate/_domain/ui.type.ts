import { HTMLAttributes } from "react";

export interface DeliveryCommonSectionProps
  extends HTMLAttributes<HTMLDivElement> {
  settlementRef: string;
  deliveryId: string;
}
