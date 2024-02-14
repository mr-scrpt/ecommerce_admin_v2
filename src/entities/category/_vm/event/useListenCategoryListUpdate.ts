"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateCategoryList } from "../../_query/categoryList.query";

export const useListenCategoryListUpdate = () => {
  const invalidateCategoryList = useInvalidateCategoryList();

  useSocketHandler(WSEventEnum.CATEGORY_LIST_REFRESH, () => {
    console.log("output_log: category list invalidate =>>>");
    invalidateCategoryList();
  });
};
