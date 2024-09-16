import { useDeliveryWithRelationQuery } from "@/entities/delivery";
import { DeliveryUpdateFormDefaultValues } from "../_domain/form.schema";

interface useDeliveryFormDefaultValuesProps {
  deliveryId: string;
}

export const useDeliveryFormDefaultValues = (
  props: useDeliveryFormDefaultValuesProps,
) => {
  const { deliveryId } = props;

  const { isPending, delivery, isFetchedAfterMount } =
    useDeliveryWithRelationQuery(deliveryId);

  let defaultValues: DeliveryUpdateFormDefaultValues = {
    deliveryType: null,
    settlement: null,
    postOfficeList: [],
    receiverList: [],
  };

  const { settlement, postOffice, deliveryType, receiver } = delivery || {};

  if (deliveryType) {
    defaultValues.deliveryType = {
      value: deliveryType.id,
      label: deliveryType.type,
      type: deliveryType.type,
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
        value: postOffice.ref,
      },
    ];
  }

  if (receiver) {
    defaultValues.receiverList = [
      {
        label: receiver.name,
        value: receiver.id,
        name: receiver.name,
        lastName: receiver.lastName,
        phone: receiver.phone,
      },
    ];
  }
  // const defaultValues = {
  //   settlement: {
  //     value: settlement?.ref || "",
  //     area: settlement?.areaDescription || "",
  //     region: settlement?.regionsDescription || "",
  //     label: settlement?.description || "",
  //   },
  //   deliveryType: {
  //     value: deliveryType?.id || "",
  //     label: deliveryType?.type || "",
  //     type: deliveryType?.type || "",
  //   },
  //   postOfficeList: {
  //     label: postOffice?.description || "",
  //     value: postOffice?.ref || "",
  //   },
  //   receiverList: {
  //     label: receiver?.name || "",
  //     value: receiver?.id || "",
  //     name: receiver?.name || "",
  //     lastName: receiver?.lastName || "",
  //     phone: receiver?.phone || "",
  //   },
  // };

  // const defaultValues = {
  //   // deliveryType: deliveryTypeDefaultSelectOption,
  //   // settlement: settlementDefaultSelectOption,
  //   // postOfficeList: [postTypeDefaultOption],
  //   // receiverList: [receiverDefaultOption],
  // };

  return { defaultValues, isPending, isFetchedAfterMount };
};
