"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateOptionList } from "../../_query/option/optionList.query";

export const useListenOptionListUpdate = () => {
  const invalidateOptionList = useInvalidateOptionList();

  useSocketHandler(WSEventEnum.OPTION_LIST_REFRESH, () => {
    console.log("output_log: option list invalidate =>>>");
    invalidateOptionList();
  });
};
