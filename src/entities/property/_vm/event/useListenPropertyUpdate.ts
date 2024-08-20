"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateProperty } from "../../_query/property/property.query";
import { useInvalidatePropertyItemByProperty } from "../../_query/propertyItem/propertyItemByProperty.query";

export const useListenPropertyUpdate = () => {
  const invalidateProperty = useInvalidateProperty();
  const invalidatePropertyItemByProperty =
    useInvalidatePropertyItemByProperty();

  useSocketHandler(WSEventEnum.PROPERTY_REFRESH, (id: string) => {
    invalidateProperty(id);
    invalidatePropertyItemByProperty(id);
  });
};
