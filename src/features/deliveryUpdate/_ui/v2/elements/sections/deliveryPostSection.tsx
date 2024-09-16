import { PostFormElements } from "@/entities/post";
import { DeliveryCommonSectionProps } from "../../../../_domain/ui.type";
import { FC } from "react";

export const DeliveryPostSection: FC<DeliveryCommonSectionProps> = (props) => {
  const { settlementRef } = props;
  return <PostFormElements.FieldPostSelect settlementRef={settlementRef} />;
};
