import { useEmitConsumerUpdate } from "../_vm/event/useEmitConsumerUpdate";
import { consumerCreateApi } from "../_api/consumerCreate.api";

export const useConsumerCreateMutation = () => {
  const { consumerUpdateEvent } = useEmitConsumerUpdate();

  const { mutateAsync, isPending } =
    consumerCreateApi.consumerCreate.create.useMutation({
      onSuccess: async ({ id }) => {
        consumerUpdateEvent(id);
      },
    });
  return {
    consumerCreate: mutateAsync,
    isPending,
  };
};
