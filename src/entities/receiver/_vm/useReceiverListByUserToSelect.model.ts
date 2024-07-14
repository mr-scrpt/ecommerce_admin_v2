"use client";

import { useAppearanceDelay } from "@/shared/lib/react";
import { useReceiverListByUser } from "../_query/useReceiverListByUser.query";

export const useReceiverListByUserToSelectModel = (userId: string) => {
  const { receiverList, isPending, isSuccess, isFetchedAfterMount } =
    useReceiverListByUser(userId);

  const receiverListToSelect = receiverList.map((receiver) => {
    return {
      value: receiver.id,
      label: `${receiver.name}, ${receiver.lastName} | ${receiver.phone}`,
    };
  });

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    isAppearancePending,
    isSuccess,
    isFetchedAfterMount,
    receiverListToSelect,
  };
};
