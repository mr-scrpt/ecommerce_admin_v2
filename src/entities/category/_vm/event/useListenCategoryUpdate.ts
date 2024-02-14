"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { CategoryId } from "../../_domain/types";
import { useInvalidateCategory } from "../../_query/category.query";

export const useListenCategoryUpdate = () => {
  const invalidateCategory = useInvalidateCategory();

  useSocketHandler(WSEventEnum.CATEGORY_REFRESH, (categoryId: CategoryId) => {
    console.log("output_log: category invalidate =>>>", categoryId);
    invalidateCategory(categoryId);
  });
};
