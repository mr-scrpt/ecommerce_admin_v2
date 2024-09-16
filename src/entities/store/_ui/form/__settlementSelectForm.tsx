import { FC, HTMLAttributes } from "react";
import { StoreFormElements } from "./storeFormElements";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";

interface SettlementFormProps extends HTMLAttributes<HTMLDivElement> {
  settlementActive: Settlement["ref"];
  onSettlementSelect: (settlement: Settlement["ref"]) => void;
}

export const StoreSelectForm: FC<SettlementFormProps> = (props) => {
  const { settlementActive, onSettlementSelect } = props;
  return (
    <StoreFormElements handleSubmit={() => {}}>
      <StoreFormElements.FieldStoreSelect
      // settlementRef={settlementActive}
      // onSelectStore={onSettlementSelect}
      />
    </StoreFormElements>
  );
};
