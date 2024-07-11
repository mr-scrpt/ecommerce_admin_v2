import { FormControl } from "@/shared/ui/form";
import { FC } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { usePostListBySettlementRefToSelectModel } from "../../../_vm/usePostOfficeListBySettlementRefToSelect.model.query";
import { PostSelectProps } from "@/kernel/domain/post/ui.type";

export const PostSelectElement: FC<PostSelectProps> = (props) => {
  const { postInit, settlementRef, onSelectPost } = props;

  const { postListToSelect, isPending, isSuccess } =
    usePostListBySettlementRefToSelectModel(settlementRef);

  const placeholder = isPending ? "Loading..." : "Select post";

  return (
    <Select defaultValue={postInit || ""} onValueChange={onSelectPost}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {postListToSelect.map((post) => (
          <SelectItem key={post.value} value={post.value}>
            {post.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
