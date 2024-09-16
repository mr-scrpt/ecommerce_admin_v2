import { FC, HTMLAttributes } from "react";

import { PostDefaultSelectOption } from "@/kernel/domain/post/form.schema";
import { Spinner } from "@/shared/ui/icons/spinner";
import { MultiSelectElement } from "@/shared/ui/select/multiSelectElement";
import { usePostListBySettlementRefToSelectModel } from "../../../_vm/usePostOfficeListBySettlementRefToSelect.model.query";

export interface PostMultiSelectProps extends HTMLAttributes<HTMLDivElement> {
  settlementRef: string;
  postListActive?: Array<PostDefaultSelectOption>;
  onSelectPost: (postList: Array<PostDefaultSelectOption>) => void;
}
export const PostMultiSelectElement: FC<PostMultiSelectProps> = (props) => {
  const { postListActive, settlementRef, onSelectPost } = props;

  const { postListToSelect, isPending, isSuccess, isFetchedAfterMount } =
    usePostListBySettlementRefToSelectModel(settlementRef);

  if (!isFetchedAfterMount || isPending || !isSuccess) {
    return <Spinner />;
  }

  return (
    <MultiSelectElement
      optionList={postListToSelect}
      optionActiveList={postListActive}
      onSelect={onSelectPost}
    />
  );
};
