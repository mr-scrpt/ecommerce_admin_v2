import { FC, HTMLAttributes } from "react";
import { SettlementFromElements } from "./settlementFromElements";

interface SettlementFormProps extends HTMLAttributes<HTMLDivElement> {}

export const SettlementSelectForm: FC<SettlementFormProps> = (props) => {
  return (
    <SettlementFromElements settlementList={[]} handleSubmit={() => {}}>
      <SettlementFromElements.SettlementList />
    </SettlementFromElements>
  );
};
