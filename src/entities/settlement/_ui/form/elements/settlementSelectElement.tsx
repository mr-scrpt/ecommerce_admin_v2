import { FC, memo } from "react";

import { DefaultSelectOption } from "@/shared/type/select";
import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { useSettlementListSearchToSelectModel } from "../../../_vm/useSettlementListSearchToSelect.model";
import { SettlementDefaultSelectOption } from "@/kernel/domain/settlement/form.schema";

export interface SettlementSelectProps extends HTMLAttributes<HTMLDivElement> {
  settlementActive?: SettlementDefaultSelectOption;
  onSelectSettlement: (
    settlementList: Array<SettlementDefaultSelectOption>,
  ) => void;
}

export const SettlementSelectElement: FC<SettlementSelectProps> = memo(
  (props) => {
    const { settlementActive, onSelectSettlement } = props;

    const { settlementListToSelect, isAppearancePending } =
      useSettlementListSearchToSelectModel();

    const placeholder = isAppearancePending
      ? "Loading..."
      : "Select settlement";

    if (!isAppearancePending) {
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
