import { DeliveryRelation } from "@/entities/delivery/_domain/delivery.types";
import { DeliveryTypeDefaultOption } from "@/kernel/domain/delivery/ui.type";
import { useMemo } from "react";

interface DeliveryDefaultValueProps {
  delivery: DeliveryRelation | null;
}

export const useDeliveryDefaultValues = (props: DeliveryDefaultValueProps) => {
  const { delivery } = props;
  return useMemo(() => {
    if (!delivery) {
      return {
        deliveryType: DeliveryTypeDefaultOption,
        settlement: { label: "", value: "", area: "", region: "" },
      };
    }

    const { settlement } = delivery || {};
    return {
      deliveryType: {
        label: delivery.deliveryType,
        value: delivery.deliveryType,
      },
      settlement: {
        // label: delivery.settlement.description,
        // value: delivery.settlement.id,
        value: settlement.ref,
        area: settlement.areaDescription,
        region: settlement.regionsDescription,
        label: settlement.description,
      },
    };
  }, [delivery]);
};
