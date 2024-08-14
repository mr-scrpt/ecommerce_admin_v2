import { usePostOfficeAvailableBySettlementRefModel } from "@/entities/post";
import { useSettlementCourierAvailableByRefModel } from "@/entities/settlement";
import { useStoreAvailableBySettlementRefModel } from "@/entities/store";
import { DeliveryTypeFieldList } from "@/features/deliveryUpdate/_vm/deliveryTypeFieldList";
import { DeliveryTypeEnum } from "@/kernel/domain/delivery/delivery.type";
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
        if (key === DeliveryTypeEnum.POST && isPostAvailable) {
          return (
            <DeliveryPostSelect
              key={key}
              delivery={row}
              selected={deliveryType === DeliveryTypeEnum.POST}
            />
          );
        }
        if (key === DeliveryTypeEnum.PICKUP && isStoreAvailable) {
          return (
            <DeliveryStoreField
              key={key}
              delivery={row}
              selected={deliveryType === DeliveryTypeEnum.PICKUP}
            />
          );
        }
        if (key === DeliveryTypeEnum.COURIER && isCourierAvailable) {
          return (
            <DeliveryCourierField
              key={key}
              delivery={row}
              selected={deliveryType === DeliveryTypeEnum.COURIER}
            />
          );
        }
      })}
    </RadioGroup>
  );
};
