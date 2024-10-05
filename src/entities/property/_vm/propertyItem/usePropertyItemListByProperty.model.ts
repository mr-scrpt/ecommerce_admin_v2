import { useAppearanceDelay } from "@/shared/lib/react";
import { usePropertyItemListByPropertyQuery } from "../../_query/propertyItem/propertyItemByProperty.query";

export const usePropertyItemListByPropertyModel = (propertyId: string) => {
  const { isPending, isSuccess, propertyItemList, isFetchedAfterMount } =
    usePropertyItemListByPropertyQuery(propertyId);

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    propertyItemList,
    isAppearancePendingPropertyItemList: isAppearancePending,
    isFetchedAfterMountPropertyItemList: isFetchedAfterMount,
    isSuccessPropertyItemList: isSuccess,
  };
};
