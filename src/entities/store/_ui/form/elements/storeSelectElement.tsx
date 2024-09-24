import { FC, memo } from "react";

import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { useAddressListBySettlementRefToSelectModel } from "../../../_vm/useAddressListBySettlementRefToSelect.model";
import { StoreDefaultSelectOption } from "@/kernel/domain/store/form.schema";

export interface StoreSelectProps extends HTMLAttributes<HTMLDivElement> {
  storeActive?: StoreDefaultSelectOption;
  settlementRef?: string;
  onSelectStore: (storeList: Array<StoreDefaultSelectOption>) => void;
}

export const StoreSelectElement: FC<StoreSelectProps> = memo((props) => {
  const { storeActive, settlementRef, onSelectStore } = props;

  const { storeListToSelect, isPending } =
    useAddressListBySettlementRefToSelectModel(settlementRef);

  const placeholder = isPending ? "Loading..." : "Select store";
  console.log("output_log: active store =>>>", storeActive);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <SelectElement
      optionList={storeListToSelect}
      optionActive={storeActive}
      placeholder={placeholder}
      onSelect={onSelectStore}
    />
  );
});

StoreSelectElement.displayName = "StoreSelectElement";
