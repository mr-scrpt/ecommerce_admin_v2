import { useDeliveryWithRelationQuery } from "@/entities/delivery";
import { DeliveryUpdateFormValues } from "../_domain/form.schema";
import { buildAddressOptionsArray } from "@/kernel/domain/address/form.schema";
import { buildDeliveryTypeOption } from "@/kernel/domain/delivery/form.schema";
import { buildPostOfficeOptionsArray } from "@/kernel/domain/post/form.schema";
import { buildSettlementOption } from "@/kernel/domain/settlement/form.schema";
import { buildStoreOptionsArray } from "@/kernel/domain/store/form.schema";

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
