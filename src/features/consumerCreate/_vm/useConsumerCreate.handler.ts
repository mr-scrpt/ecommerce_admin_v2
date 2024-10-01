import { useRouter } from "next/navigation";
import { ConsumerCreateFormValues } from "../_domain/form.schema";
import { useConsumerCreateMutation } from "../_mutation/useConsumerCreate.mutation";

interface ConsumerCreateHandlerProps {
  onSuccess?: () => void;
  callbackUrl?: string;
}
export const useConsumerCreateHandler = (props: ConsumerCreateHandlerProps) => {
  const { onSuccess, callbackUrl } = props;
  const {
    consumerCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useConsumerCreateMutation();

  const router = useRouter();

  const handleConsumerCreate = async (data: ConsumerCreateFormValues) => {
    await consumerCreate({
      consumerData: data,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    handleConsumerCreate,
    isPendingCreate,
    isSuccessCreate,
  };
};
