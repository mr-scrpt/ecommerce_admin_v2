"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateCategoryWithRelation } from "../../_query/categoryWithRelation.query";

type InvalidateParams = {
  id?: string;
  slug?: string;
};
export const useListenCategoryUpdate = () => {
  const invalidateCategory = useInvalidateCategoryWithRelation();

  useSocketHandler(WSEventEnum.CATEGORY_REFRESH, (params: InvalidateParams) => {
    console.log("output_log: category invalidate =>>>", params);
    invalidateCategory(params);
  });
};
