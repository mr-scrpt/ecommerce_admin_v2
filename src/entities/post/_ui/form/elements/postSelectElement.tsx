import { FC, HTMLAttributes } from "react";

import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { usePostListBySettlementRefToSelectModel } from "../../../_vm/usePostOfficeListBySettlementRefToSelect.model.query";
import { PostDefaultSelectOption } from "@/kernel/domain/post/form.schema";

export interface PostSelectProps extends HTMLAttributes<HTMLDivElement> {
  settlementRef: string;
  postActive?: PostDefaultSelectOption;
  onSelectPost: (postList: Array<PostDefaultSelectOption>) => void;
}
export const PostSelectElement: FC<PostSelectProps> = (props) => {
  const { postActive, settlementRef, onSelectPost } = props;

  const { postListToSelect, isPending, isSuccess, isFetchedAfterMount } =
    usePostListBySettlementRefToSelectModel(settlementRef);

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
