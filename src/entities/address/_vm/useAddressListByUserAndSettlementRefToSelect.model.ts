"use client";

import { buildAddressOptionsArray } from "@/kernel/domain/address/form.schema";
import { useAppearanceDelay } from "@/shared/lib/react";
import { useAddressListByUserAndSettlementRefQuery } from "../_query/useAddressListByUserAndSettlementRef.query";

interface IAddressListToSelectModel {
  userId: string;
  settlementRef?: string;
}

export const useAddressListByUserAndSettlementRefToSelectModel = (
  data: IAddressListToSelectModel,
) => {
  const { addressList, isPending, isSuccess, isFetchedAfterMount } =
    useAddressListByUserAndSettlementRefQuery(data);

  const addressListToSelect = buildAddressOptionsArray(addressList);

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
    addressListToSelect,
  };
};
