import {
  buildDeliveryTypeOption,
  useDeliveryWithRelationQuery,
} from "@/entities/delivery";
import { DeliveryUpdateFormValues } from "../_domain/form.schema";
import { buildSettlementOption } from "@/entities/settlement";
import { buildPostOfficeOptionsArray } from "@/entities/post";
import { buildAddressOptionsArray } from "@/entities/address";
import { buildStoreOptionsArray } from "@/entities/store";
import { buildReceiverOptionsArray } from "@/entities/receiver";

interface useDeliveryFormDefaultValuesProps {
  deliveryId: string;
}

export const useDeliveryFormDefaultValues = (
  props: useDeliveryFormDefaultValuesProps,
) => {
  const { deliveryId } = props;

  const { isPending, delivery, isFetchedAfterMount } =
    useDeliveryWithRelationQuery(deliveryId);

  const { settlement, postOffice, deliveryType, address, store, receiver } =
    delivery || {};

  const defaultValues: DeliveryUpdateFormValues = {
    deliveryType: buildDeliveryTypeOption(deliveryType),
    settlement: buildSettlementOption(settlement),
    postOfficeList: buildPostOfficeOptionsArray([postOffice]),
    addressList: buildAddressOptionsArray([address]),
    storeList: buildStoreOptionsArray([store]),
    // receiverList: buildReceiverOptionsArray([receiver]),
  };

  return { defaultValues, isPending, isFetchedAfterMount };
};
