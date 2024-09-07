import { DeliveryRelation } from "@/entities/delivery/_domain/delivery.types";
import { deliveryTypeDefaultOption } from "@/kernel/domain/delivery/deliveryType.schema";
import { settlementDefaultOption } from "@/kernel/domain/settlement/settlement.schema";
import { useMemo } from "react";

interface DeliveryDefaultValueProps {
  delivery: DeliveryRelation | null;
}

export const useDeliveryDefaultValues = (props: DeliveryDefaultValueProps) => {
  const { delivery } = props;
  return useMemo(() => {
    if (!delivery) {
      return {
        deliveryType: deliveryTypeDefaultOption,
        settlement: settlementDefaultOption,
      };
    }

    const { settlement } = delivery || {};
    return {
      deliveryType: {
        label: delivery.deliveryType.type,
        value: delivery.deliveryType.type,
      },
      settlement: {
        // label: delivery.settlement.description,
        // value: delivery.settlement.id,
        value: settlement.ref,
        area: settlement.areaDescription,
        region: settlement.regionsDescription,
        label: settlement.description,
      },
      postList: [],
    };
  }, [delivery]);
};
