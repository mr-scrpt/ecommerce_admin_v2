import { useRouter } from "next/navigation";
import { useStoreUpdateMutation } from "../_mutation/useStoreUpdate.mutation";
import { StoreUpdateFormValues } from "../_domain/form.schema";

interface StoreFormUpdateProps {
  data: {
    storeId: string;
  };
  callbackUrl?: string;
  onSuccess?: () => void;
}

export const useStoreUpdateHandler = (props: StoreFormUpdateProps) => {
  const { callbackUrl, onSuccess, data } = props;
  const { storeId } = data;

  const {
    storeUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useStoreUpdateMutation();

  const router = useRouter();

  const handleStoreUpdate = async (data: StoreUpdateFormValues) => {
    console.log("output_log: DATA =>>>", data);
    const { settlement, ...storeData } = data;

    if (!settlement) {
      return;
    }

    await storeUpdate({
      selector: { id: storeId },
      storeData,
      settlementData: { settlementRef: settlement.value },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return {
    handleStoreUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  };
};
