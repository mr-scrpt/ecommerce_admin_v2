import { useAppearanceDelay } from "@/shared/lib/react";
import { usePropertyQuery } from "../_query/property/property.query";

export const usePropertyModel = (propertyId: string) => {
  const { isPending, property, isFetchedAfterMount, isSuccess } =
    usePropertyQuery(propertyId);

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    property,
    isAppearancePendingProperty: isAppearancePending,
    isFetchedAfterMountProperty: isFetchedAfterMount,
    isSuccessProperty: isSuccess,
  };
};
