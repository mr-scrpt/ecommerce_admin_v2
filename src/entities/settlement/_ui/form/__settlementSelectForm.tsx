import { FC, HTMLAttributes } from "react";
import { SettlementFormElements } from "./settlementFromElements";
import { Settlement } from "@prisma/client";

interface SettlementFormProps extends HTMLAttributes<HTMLDivElement> {
  settlementActive: Settlement["ref"];
  onSettlementSelect: (settlement: Settlement["ref"]) => void;
}

export const SettlementSelectForm: FC<SettlementFormProps> = (props) => {
  const { settlementActive, onSettlementSelect } = props;
  return (
    <SettlementFormElements settlementData={settlementActive}>
      <SettlementFormElements.FieldSettlementSelect
        onSelectSettlement={onSettlementSelect}
      />
    </SettlementFormElements>
  );
};
