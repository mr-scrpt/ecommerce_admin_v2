"use client";
import { receiverCreateApi } from "../_api/receiverCreate.api";
import { useEmitReceiverCreate } from "../_vm/event/useEmitReceiverCreate";

export const useReceiverCreateMutation = () => {
  const { receiverCreateEvent } = useEmitReceiverCreate();
  const { isPending, isSuccess, mutateAsync } =
    receiverCreateApi.receiverCreate.create.useMutation({
      onSuccess: async ({ userId }) => {
        receiverCreateEvent(userId);
      },
    });
  return {
    receiverCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
