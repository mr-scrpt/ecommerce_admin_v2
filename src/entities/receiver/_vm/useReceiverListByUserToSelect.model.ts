"use client";

import { useAppearanceDelay } from "@/shared/lib/react";
import { useReceiverListByUser } from "../_query/useReceiverListByUser.query";
import { buildReceiverOptionsArray } from "@/kernel/domain/receiver/form.schema";

export const useReceiverListByUserToSelectModel = (userId: string) => {
  const { receiverList, isPending, isSuccess, isFetchedAfterMount } =
    useReceiverListByUser(userId);

  const receiverListToSelect = buildReceiverOptionsArray(receiverList);
  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
    receiverListToSelect,
  };
};
