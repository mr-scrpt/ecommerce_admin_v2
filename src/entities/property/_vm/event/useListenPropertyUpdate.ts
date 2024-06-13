"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateProperty } from "../../_query/property/property.query";

type QueryParams = {
  id: string;
};
export const useListenPropertyUpdate = () => {
  const invalidateProperty = useInvalidateProperty();

  useSocketHandler(WSEventEnum.PROPERTY_REFRESH, (query: QueryParams) => {
    invalidateProperty(query);
  });
};
