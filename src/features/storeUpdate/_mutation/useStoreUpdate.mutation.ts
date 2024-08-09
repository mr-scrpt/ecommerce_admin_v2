import { storeUpdateApi } from "../_api/storeUpdate.api";
import { useEmitStoreUpdate } from "../_vm/event/useEmitStoreUpdate";

export const useStoreUpdateMutation = () => {
  const { storeUpdateEvent } = useEmitStoreUpdate();

  const { mutateAsync, isPending } =
    storeUpdateApi.storeUpdate.update.useMutation({
      onSuccess: async ({ id }) => {
        storeUpdateEvent(id);
      },
    });
  return {
    storeUpdate: mutateAsync,
    isPending,
  };
};
