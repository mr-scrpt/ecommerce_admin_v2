"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { OptionId } from "../../_domain/option/types";
import { useInvalidateOption } from "../../_query/option/option.query";

export const useListenOptionUpdate = () => {
  const invalidateOption = useInvalidateOption();

  useSocketHandler(WSEventEnum.CATEGORY_REFRESH, (categoryId: OptionId) => {
    console.log("output_log: category invalidate =>>>", categoryId);
    invalidateOption(categoryId);
  });
};
