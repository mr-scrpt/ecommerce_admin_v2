import { FormControl } from "@/shared/ui/form";
import { FC } from "react";

import { useReceiverListByUserToSelectModel } from "@/entities/receiver/_vm/useReceiverListByUserToSelect.model";
import { ReceiverSelectProps } from "@/kernel/domain/receiver/ui.type";
import { Spinner } from "@/shared/ui/icons/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export const ReceiverSelectElement: FC<ReceiverSelectProps> = (props) => {
  const { receiverInit, userId, onSelectReceiver } = props;

  const {
    receiverListToSelect,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  } = useReceiverListByUserToSelectModel(userId);

  const placeholder = isAppearancePending ? "Loading..." : "Select receiver";

  if (!isFetchedAfterMount || isAppearancePending) {
    return <Spinner />;
  }

  return (
    <Select
      defaultValue={receiverInit || ""}
      value={receiverInit || ""}
      onValueChange={onSelectReceiver}
      disabled={!receiverListToSelect.length}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {isSuccess &&
          receiverListToSelect.map((receiver) => (
            <SelectItem key={receiver.value} value={receiver.value}>
              {receiver.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
