import { FC, HTMLAttributes } from "react";
import { SettlementFromElements } from "./elments/settlementFromElements";
import { Settlement } from "@prisma/client";

interface SettlementFormProps extends HTMLAttributes<HTMLDivElement> {
  settlementActive: Settlement["ref"];
  onSettlementSelect: (settlement: Settlement["ref"]) => void;
}

export const SettlementSelectForm: FC<SettlementFormProps> = (props) => {
  const { settlementActive, onSettlementSelect } = props;
  return (
    <SettlementFromElements settlementData={settlementActive}>
      <SettlementFromElements.FieldSettlementSelect
        onSelectSettlement={onSettlementSelect}
      />
    </SettlementFromElements>
  );
};
