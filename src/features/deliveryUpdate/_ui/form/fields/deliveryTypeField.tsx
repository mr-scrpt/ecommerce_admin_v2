import { usePostOfficeAvailableBySettlementRefModel } from "@/entities/post";
import { useSettlementCourierAvailableByRefModel } from "@/entities/settlement";
import { useStoreAvailableBySettlementRefModel } from "@/entities/store";
import { DeliveryTypeFieldList } from "@/features/deliveryUpdate/_vm/deliveryTypeFieldList";
import { DELIVERY_TYPE } from "@/kernel/domain/delivery/delivery.type";
import { RadioGroup } from "@/shared/ui/radio-group";
import { FC, HTMLAttributes } from "react";
import { DeliveryCourierField } from "./deliveryCourierField";
import { DeliveryStoreField } from "./deliveryPickupField";
import { DeliveryPostSelect } from "./deliveryPostField";

interface DeliveryTypeRadioProps extends HTMLAttributes<HTMLDivElement> {
  settlementRef: string;
  onChangeDeliveryType: (value: string) => void;
  deliveryType: string;
}

export const DeliveryTypeField: FC<DeliveryTypeRadioProps> = (props) => {
  const { settlementRef, deliveryType, onChangeDeliveryType } = props;

  const { isStoreAvailable } =
    useStoreAvailableBySettlementRefModel(settlementRef);

  const { isPostAvailable } =
    usePostOfficeAvailableBySettlementRefModel(settlementRef);

  const { isCourierAvailable } =
    useSettlementCourierAvailableByRefModel(settlementRef);

  return (
    <RadioGroup
      onValueChange={onChangeDeliveryType}
      defaultValue={deliveryType}
      value={deliveryType}
      className="flex flex-col space-y-1"
    >
      {Object.entries(DeliveryTypeFieldList).map(([key, row]) => {
        if (key === DELIVERY_TYPE.POST && isPostAvailable) {
          return (
            <DeliveryPostSelect
              key={key}
              delivery={row}
              selected={deliveryType === DELIVERY_TYPE.POST}
            />
          );
        }
        if (key === DELIVERY_TYPE.PICKUP && isStoreAvailable) {
          return (
            <DeliveryStoreField
              key={key}
              delivery={row}
              selected={deliveryType === DELIVERY_TYPE.PICKUP}
            />
          );
        }
        if (key === DELIVERY_TYPE.COURIER && isCourierAvailable) {
          return (
            <DeliveryCourierField
              key={key}
              delivery={row}
              selected={deliveryType === DELIVERY_TYPE.COURIER}
            />
          );
        }
      })}
    </RadioGroup>
  );
};
