import { FormControl, FormItem, FormLabel } from "@/shared/ui/form";
import { RadioGroupItem } from "@/shared/ui/radio-group";
import { FC, HTMLAttributes } from "react";
import { DeliveryTypeEnum } from "../../_domain/delivery.types";
import { PostType } from "../../_vm/selectDeliveryType";

interface DeliveryPickupProps extends HTMLAttributes<HTMLDivElement> {
  delivery: PostType;
  selected: boolean;
}

export const DeliveryPickupField: FC<DeliveryPickupProps> = (props) => {
  const { delivery, selected } = props;
  return (
    <div className="flex w-full flex-col gap-2 border p-4">
      <FormItem className="flex w-full items-center space-x-3 space-y-0">
        <FormControl>
          <RadioGroupItem value={DeliveryTypeEnum.PICKUP} />
        </FormControl>
        <FormLabel className="font-normal">{delivery.value}</FormLabel>
      </FormItem>

      {selected &&
        delivery.formElement.map((row) => {
          return row();
        })}
    </div>
  );
};
