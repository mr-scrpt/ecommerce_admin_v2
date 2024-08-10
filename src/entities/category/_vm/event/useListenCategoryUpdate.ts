"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateCategoryWithRelation } from "../../_query/userCategoryWithRelation.query";

export const useListenCategoryUpdate = () => {
  const invalidateCategory = useInvalidateCategoryWithRelation();

  useSocketHandler(WSEventEnum.CATEGORY_REFRESH, (id: string) => {
    console.log("output_log: category invalidate =>>>", id);
    invalidateCategory(id);
  });
};
