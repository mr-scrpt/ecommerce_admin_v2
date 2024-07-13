"use client";

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

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    receiverListToSelect,
  };
};
