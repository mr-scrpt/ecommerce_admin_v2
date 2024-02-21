"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { OptionId } from "../../_domain/option/types";
import { useInvalidateOption } from "../../_query/option/option.query";
import { useInvalidateOptionWithRelation } from "../../_query/option/optionWithRelation.query";

export const useListenOptionUpdate = () => {
  const invalidateOption = useInvalidateOption();
  const invalidateOptionWithRelation = useInvalidateOptionWithRelation();

  useSocketHandler(WSEventEnum.OPTION_REFRESH, (categoryId: OptionId) => {
    invalidateOption(categoryId);
    invalidateOptionWithRelation(categoryId);
  });
};
