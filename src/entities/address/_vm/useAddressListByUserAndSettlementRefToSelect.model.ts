"use client";

import { useAppearanceDelay } from "@/shared/lib/react";
import { useAddressListByUserAndSettlementRef } from "../_query/useAddressListByUserAndSettlementRef.query";

interface IAddressListToSelectModel {
  userId: string;
  settlementRef: string;
}

export const useAddressListByUserAndSettlementRefToSelectModel = (
  data: IAddressListToSelectModel,
) => {
  const { addressList, isPending, isSuccess, isFetchedAfterMount } =
    useAddressListByUserAndSettlementRef(data);

  const sotoreListToSelect = addressList.map((address) => {
    return {
      value: address.id,
      label: `${address.street}, ${address.house} ${address.apartment}`,
    };
  });

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
    addressListToSelect: sotoreListToSelect || [],
  };
};
