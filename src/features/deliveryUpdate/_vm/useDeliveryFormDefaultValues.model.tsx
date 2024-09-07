import { useDeliveryWithRelationQuery } from "@/entities/delivery";
import { deliveryTypeDefaultOption } from "@/kernel/domain/delivery/deliveryType.schema";
import { postTypeDefaultOption } from "@/kernel/domain/post/post.schema";
import { settlementDefaultOption } from "@/kernel/domain/settlement/settlement.schema";

interface useDeliveryFormDefaultValuesProps {
  deliveryId: string;
}

export const useDeliveryFormDefaultValues = (
  props: useDeliveryFormDefaultValuesProps,
) => {
  const { deliveryId } = props;
  const { isPending, delivery, isFetchedAfterMount } =
    useDeliveryWithRelationQuery(deliveryId);

  const defaultValues = {
    deliveryType: deliveryTypeDefaultOption,
    settlement: settlementDefaultOption,
    postOfficeList: [postTypeDefaultOption],
  };

  const { settlement, postOffice, deliveryType } = delivery || {};

  if (deliveryType) {
    defaultValues.deliveryType = {
      value: deliveryType.type,
      label: deliveryType.type,
    };
  }

  if (settlement) {
    defaultValues.settlement = {
      value: settlement.ref,
      area: settlement.areaDescription,
      region: settlement.regionsDescription,
      label: settlement.description,
    };
  }

  if (postOffice) {
    defaultValues.postOfficeList = [
      {
        label: postOffice.description,
        value: postOffice.description,
      },
    ];
  }

  return { defaultValues, isPending, isFetchedAfterMount };
};
