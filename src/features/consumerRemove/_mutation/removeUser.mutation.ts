import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { consumerRemoveApi } from "../_api/consumerRemove.api";
import { useEmitUserRemove } from "../_vm/event/useEmitUserRemove";

export const useConsumerRemoveMutation = () => {
  const { userRemoveEvent } = useEmitUserRemove();
  const { isPending, isSuccess, mutateAsync } =
    consumerRemoveApi.consumerRemove.remove.useMutation<Consumer>({
      onSuccess: async ({ id }) => {
        userRemoveEvent(id);
      },
    });
  return {
    userRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
