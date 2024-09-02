import { FC, memo } from "react";

import { SelectOptionItem } from "@/shared/type/select";
import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { useSettlementListSearchToSelectModel } from "../../../_vm/useSettlementListSearchToSelect.model";

export interface SettlementSelectProps extends HTMLAttributes<HTMLDivElement> {
  settlementActive?: SelectOptionItem;
  onSelectSettlement: (settlementList: Array<SelectOptionItem>) => void;
}

export const SettlementSelectElement: FC<SettlementSelectProps> = memo(
  (props) => {
    const { settlementActive, onSelectSettlement } = props;

    const { settlementListToSelect, isPending } =
      useSettlementListSearchToSelectModel();

    const placeholder = isPending ? "Loading..." : "Select settlement";

    if (isPending) {
      return <Spinner />;
    }

    return (
      <SelectElement
        optionList={settlementListToSelect}
        optionActive={settlementActive}
        placeholder={placeholder}
        onSelect={onSelectSettlement}
      />
    );
  },
);

SettlementSelectElement.displayName = "SettlementSelectElement";
