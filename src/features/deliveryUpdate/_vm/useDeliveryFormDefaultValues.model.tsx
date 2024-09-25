import { useDeliveryWithRelationQuery } from "@/entities/delivery";
import { buildSettlementOption } from "@/entities/settlement";
import { buildStoreOptionsArray } from "@/entities/store";
import { DeliveryUpdateFormValues } from "../_domain/form.schema";
import { buildAddressOptionsArray } from "@/kernel/domain/address/form.schema";
import { buildDeliveryTypeOption } from "@/kernel/domain/delivery/form.schema";
import { buildPostOfficeOptionsArray } from "@/kernel/domain/post/form.schema";

interface useDeliveryFormDefaultValuesProps {
  deliveryId: string;
}

export const useDeliveryFormDefaultValues = (
  props: useDeliveryFormDefaultValuesProps,
) => {
  const { deliveryId } = props;

  const { isPending, delivery, isFetchedAfterMount } =
    useDeliveryWithRelationQuery(deliveryId);

  const { settlement, postOffice, deliveryType, address, store } =
    delivery || {};

  const defaultValues: DeliveryUpdateFormValues = {
    deliveryType: buildDeliveryTypeOption(deliveryType),
    settlement: buildSettlementOption(settlement),
    postOfficeList: buildPostOfficeOptionsArray([postOffice]),
    addressList: buildAddressOptionsArray([address]),
    storeList: buildStoreOptionsArray([store]),
  };

  return { defaultValues, isPending, isFetchedAfterMount };
};
