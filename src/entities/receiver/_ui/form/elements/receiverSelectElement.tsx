import { FC, HTMLAttributes } from "react";

import { ReceiverDefaultSelectOption } from "@/kernel/domain/receiver/form.schema";
import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { useReceiverListByUserToSelectModel } from "../../../_vm/useReceiverListByUserToSelect.model";

export interface ReceiverSelectProps extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  receiverActive?: ReceiverDefaultSelectOption;
  onSelectReceiver: (receiverList: Array<ReceiverDefaultSelectOption>) => void;
}
export const ReceiverSelectElement: FC<ReceiverSelectProps> = (props) => {
  const { receiverActive, userId, onSelectReceiver } = props;

  console.log("output_log: ACTIVE RECEIVER =>>>", receiverActive);

  const {
    receiverListToSelect,
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
  } = useReceiverListByUserToSelectModel(userId);
  console.log("output_log: ReceiverList =>>>", receiverListToSelect);

  const placeholder = isAppearancePending ? "Loading..." : "Select receiver";

  if (!isFetchedAfterMount || isAppearancePending || !isSuccess) {
    return <Spinner />;
  }

  return (
    <SelectElement
      optionActive={receiverActive}
      onSelect={onSelectReceiver}
      optionList={receiverListToSelect}
      placeholder={placeholder}
    />
  );
};
