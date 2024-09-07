import { FC, HTMLAttributes } from "react";

import { SelectOptionItem } from "@/shared/type/select";
import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { usePostListBySettlementRefToSelectModel } from "../../../_vm/usePostOfficeListBySettlementRefToSelect.model.query";

export interface PostSelectProps extends HTMLAttributes<HTMLDivElement> {
  settlementRef: string;
  postActive?: SelectOptionItem;
  onSelectPost: (postList: Array<SelectOptionItem>) => void;
}
export const PostSelectElement: FC<PostSelectProps> = (props) => {
  const { postActive, settlementRef, onSelectPost } = props;

  const { postListToSelect, isPending, isSuccess, isFetchedAfterMount } =
    usePostListBySettlementRefToSelectModel(settlementRef);
  console.log("output_log:  =>>>", postListToSelect);

  const placeholder = isPending ? "Loading..." : "Select post";

  if (!isFetchedAfterMount || isPending || !isSuccess) {
    return <Spinner />;
  }

  return (
    <SelectElement
      optionActive={postActive}
      onSelect={onSelectPost}
      optionList={postListToSelect}
      placeholder={placeholder}
    />
  );
};
