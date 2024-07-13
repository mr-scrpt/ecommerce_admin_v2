import { FormControl } from "@/shared/ui/form";
import { FC } from "react";

import { ReceiverSelectProps } from "@/kernel/domain/receiver/ui.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useReceiverListByUserToSelectModel } from "@/entities/receiver/_vm/useReceiverListByUserToSelect.model";

export const ReceiverSelectElement: FC<ReceiverSelectProps> = (props) => {
  const { receiverInit, userId, onSelectReceiver } = props;

  const { receiverListToSelect, isPending, isSuccess } =
    useReceiverListByUserToSelectModel(userId);

  const placeholder = isPending ? "Loading..." : "Select receiver";

  return (
    <Select
      defaultValue={receiverInit || ""}
      onValueChange={onSelectReceiver}
      disabled={!receiverListToSelect.length}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {receiverListToSelect.map((receiver) => (
          <SelectItem key={receiver.value} value={receiver.value}>
            {receiver.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
