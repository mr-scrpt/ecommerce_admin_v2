import { buildAddressOptionsArray } from "@/entities/address";
import {
  buildDeliveryTypeOption,
  useDeliveryWithRelationQuery,
} from "@/entities/delivery";
import { buildPostOfficeOptionsArray } from "@/entities/post";
import { buildSettlementOption } from "@/entities/settlement";
import { buildStoreOptionsArray } from "@/entities/store";
import { DeliveryUpdateFormValues } from "../_domain/form.schema";

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
