"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateCategoryWithRelation } from "../../_query/userCategoryWithRelation.query";
import { useInvalidateCategory } from "../../_query/useCategory.query";

export const useListenCategoryUpdate = () => {
  const invalidateCategoryWithRelation = useInvalidateCategoryWithRelation();

  const invalidateCategory = useInvalidateCategory();

  useSocketHandler(WSEventEnum.CATEGORY_REFRESH, (id: string) => {
    console.log("output_log: category invalidate =>>>", id);
    invalidateCategoryWithRelation(id);
    invalidateCategory(id);
  });
};
