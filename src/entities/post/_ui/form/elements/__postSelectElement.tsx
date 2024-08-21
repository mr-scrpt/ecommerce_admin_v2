import { FormControl } from "@/shared/ui/form";
import { FC, HTMLAttributes, memo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { usePostListBySettlementRefToSelectModel } from "../../../_vm/usePostOfficeListBySettlementRefToSelect.model.query";

export interface PostSelectProps extends HTMLAttributes<HTMLDivElement> {
  postInit?: string | null;
  settlementRef: string;
  onSelectPost?: (post: string) => void;
}

export const PostSelectElement: FC<PostSelectProps> = memo((props) => {
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
});

PostSelectElement.displayName = "PostSelectElement";

// export const PostSelectElement: FC<PostSelectProps> = (props) => {
//   const { postInit, settlementRef, onSelectPost } = props;
//
//   const { postListToSelect, isPending, isSuccess } =
//     usePostListBySettlementRefToSelectModel(settlementRef);
//
//   const placeholder = isPending ? "Loading..." : "Select post";
//
//   return (
//     <Select defaultValue={postInit || ""} onValueChange={onSelectPost}>
//       <FormControl>
//         <SelectTrigger>
//           <SelectValue placeholder={placeholder} />
//         </SelectTrigger>
//       </FormControl>
//       <SelectContent>
//         {postListToSelect.map((post) => (
//           <SelectItem key={post.value} value={post.value}>
//             {post.label}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// };
