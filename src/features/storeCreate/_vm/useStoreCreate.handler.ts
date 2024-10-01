import { useRouter } from "next/navigation";
import { StoreCreateFormValues } from "../_domain/form.schema";
import { useStoreCreateMutation } from "../_mutation/useStoreCreate.mutation";

interface StoreFormCreateProps {
  callbackUrl?: string;
  onSuccess?: () => void;
}

export const useStoreCreateHandler = (props: StoreFormCreateProps) => {
  const { callbackUrl, onSuccess } = props;

  const {
    storeCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useStoreCreateMutation();

  const router = useRouter();

  const handleStoreCreate = async (data: StoreCreateFormValues) => {
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
    handleStoreCreate,
    isPendingCreate,
    isSuccessCreate,
  };
};
