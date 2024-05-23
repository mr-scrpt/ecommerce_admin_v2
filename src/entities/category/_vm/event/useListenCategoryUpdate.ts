"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { CategoryId } from "../../_domain/types";
import { useInvalidateCategoryWithRelation } from "../../_query/categoryWithRelation.query";

export const useListenCategoryUpdate = () => {
  const invalidateCategory = useInvalidateCategoryWithRelation();

  useSocketHandler(WSEventEnum.CATEGORY_REFRESH, (categoryId: CategoryId) => {
    console.log("output_log: category invalidate =>>>", categoryId);
    invalidateCategory(categoryId);
  });
};
