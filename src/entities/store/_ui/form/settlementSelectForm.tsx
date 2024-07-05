import { FC, HTMLAttributes } from "react";
import { StoreFormElements } from "./elements/storeFormElements";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";

interface SettlementFormProps extends HTMLAttributes<HTMLDivElement> {
  settlementActive: Settlement["ref"];
  onSettlementSelect: (settlement: Settlement["ref"]) => void;
}

export const StoreSelectForm: FC<SettlementFormProps> = (props) => {
  const { settlementActive, onSettlementSelect } = props;
  return (
    <StoreFormElements handleSubmit={() => {}}>
      <StoreFormElements.FieldStoreList
        settlementRef={settlementActive}
        onSelectStore={onSettlementSelect}
      />
    </StoreFormElements>
  );
};
