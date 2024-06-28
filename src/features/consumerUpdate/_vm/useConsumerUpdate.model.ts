import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { useAppSession } from "@/kernel/lib/nextauth";
import { useConsumerUpdateMutation } from "../_mutation/useUserUpdate.mutation";

export const useConsumerUpdateModel = () => {
  const { update: updateSession } = useAppSession();

  const onSuccess = async (consumer: Consumer) => {
    await updateSession({
      consumer,
    });
  };

  const { mutateAsync, isPending } = useConsumerUpdateMutation({ onSuccess });

  return {
    consumerUpdate: mutateAsync,
    isPending,
  };
};
