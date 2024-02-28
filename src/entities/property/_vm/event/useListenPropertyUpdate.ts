"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { PropertyId } from "../../_domain/property/types";
import { useInvalidateProperty } from "../../_query/property/property.query";

export const useListenPropertyUpdate = () => {
  const invalidateProperty = useInvalidateProperty();

  useSocketHandler(WSEventEnum.PROPERTY_REFRESH, (categoryId: PropertyId) => {
    invalidateProperty(categoryId);
  });
};
