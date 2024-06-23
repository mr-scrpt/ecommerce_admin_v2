import { FormControl, FormItem, FormLabel } from "@/shared/ui/form";
import { RadioGroupItem } from "@/shared/ui/radio-group";
import { FC, HTMLAttributes } from "react";
import { PostType } from "../../_vm/selectDeliveryType";
import { DeliveryTypeEnum } from "@/kernel/domain/delivery/delivery.type";

interface DeliveryCourierProps extends HTMLAttributes<HTMLDivElement> {
  delivery: PostType;
  selected: boolean;
}

export const DeliveryCourierField: FC<DeliveryCourierProps> = (props) => {
  const { delivery, selected } = props;
  return (
    <div className="flex w-full flex-col gap-2 border p-4">
      <FormItem className="flex w-full items-center space-x-3 space-y-0">
        <FormControl>
          <RadioGroupItem value={DeliveryTypeEnum.COURIER} />
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
