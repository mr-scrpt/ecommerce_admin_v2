import { FC, HTMLAttributes } from "react";
import { PostFormElements } from "./elements/postFormElements";
import { Settlement } from "@/kernel/domain/settlement/settlement.type";

interface SettlementFormProps extends HTMLAttributes<HTMLDivElement> {
  settlementActive: Settlement["ref"];
  onSettlementSelect: (settlement: Settlement["ref"]) => void;
}

export const PostSelectForm: FC<SettlementFormProps> = (props) => {
  const { settlementActive, onSettlementSelect } = props;
  return (
    <PostFormElements handleSubmit={() => {}}>
      <PostFormElements.FieldPostList
      // settlementRef={settlementActive}
      // onSelectPost={onSettlementSelect}
      />
    </PostFormElements>
  );
};
