import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { consumerUpdateApi } from "../_api/consumerUpdate.api";
import { useEmitConsumerUpdate } from "../_vm/event/useEmitConsumerUpdate";

interface IConsumerUpdateMutation {
  onSuccess: (consumer: Consumer) => void;
}

export const useConsumerUpdateMutation = (props: IConsumerUpdateMutation) => {
  const { onSuccess } = props;
  const { userUpdateEvent } = useEmitConsumerUpdate();

  const { mutateAsync, isPending } =
    consumerUpdateApi.consumerUpdate.update.useMutation({
      onSuccess: async (consumer) => {
        onSuccess(consumer);
        userUpdateEvent(consumer.id);
      },
    });
  return {
    mutateAsync,
    isPending,
  };
};
