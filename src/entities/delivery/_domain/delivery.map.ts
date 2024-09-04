import { DELIVERY_TYPE } from "@/kernel/domain/delivery/delivery.type";
import { DeliveryType } from "@/kernel/domain/delivery/deliveryType.type";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";

export const deliveryMapToSettlement = ({
  deliveryTypeList,
  settlement,
}: {
  deliveryTypeList: Array<DeliveryType>;
  settlement: Settlement & {
    storeList: Array<any>;
  };
}) => {
  const deliveryTypeChecks = {
    [DELIVERY_TYPE.POST]: () => !!+settlement.warehouse,
    [DELIVERY_TYPE.PICKUP]: () =>
      settlement.storeList && settlement.storeList.length > 0,
    [DELIVERY_TYPE.COURIER]: () => !!settlement.radiusHomeDelivery,
  };

  return deliveryTypeList.filter(
    (delivery) =>
      deliveryTypeChecks[delivery.type] && deliveryTypeChecks[delivery.type](),
  );
};
