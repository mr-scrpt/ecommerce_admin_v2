"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidatePropertyList } from "../../_query/property/propertyList.query";

export const useListenPropertyListUpdate = () => {
  const invalidatePropertyList = useInvalidatePropertyList();

  useSocketHandler(WSEventEnum.PROPERTY_LIST_REFRESH, () => {
    console.log("output_log: property list invalidate =>>>");
    invalidatePropertyList();
  });
};
