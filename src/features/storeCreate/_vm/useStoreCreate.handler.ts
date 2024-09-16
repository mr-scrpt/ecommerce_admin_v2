import { useRouter } from "next/navigation";
import { StoreCreateFormValues } from "../_domain/form.schema";
import { useStoreCreateMutation } from "../_mutation/useStoreCreate.mutation";

export const useStoreCreateHandler = (
  onSuccess?: () => void,
  callbackUrl?: string,
) => {
  const { storeCreate, isPending } = useStoreCreateMutation();

  const router = useRouter();

  const handleSubmit = async (data: StoreCreateFormValues) => {
    const { settlement, ...storeData } = data;

    if (!settlement) {
      return;
    }
    await storeCreate({
      storeData,
      settlementData: { settlementRef: settlement.value },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    handleSubmit,
    isPendingCreate: isPending,
  };
};
