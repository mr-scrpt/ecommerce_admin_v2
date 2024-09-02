import { FC, memo } from "react";

import { MultiSelectElement } from "@/shared/ui/select/multiSelectElement";
import { HTMLAttributes } from "react";
import { SelectOptionItem } from "@/shared/type/select";
// import { useSettlementListToSelectModel } from "../../../_vm/useSettlementListToSelect.modle";

export interface SettlementMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  settlementListActive?: Array<SelectOptionItem>;
  onSelectSettlement: (settlementList: Array<SelectOptionItem>) => void;
}

export const SettlementMultiSelectElement: FC<SettlementMultiSelectProps> =
  memo((props) => {
    const { settlementListActive, onSelectSettlement } = props;

    // const { settlementListToSelect: settlementSelectOptionList } =
    //   useSettlementListToSelectModel();

    // return (
    //   <MultiSelectElement
    //     optionList={settlementSelectOptionList}
    //     optionActiveList={settlementListActive}
    //     onSelect={onSelectSettlement}
    //   />
    // );
    return null;
  });

SettlementMultiSelectElement.displayName = "SettlementMultiSelectElement";
