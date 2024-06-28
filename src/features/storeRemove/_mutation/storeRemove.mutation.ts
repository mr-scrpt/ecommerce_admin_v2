import { storeRemoveApi } from "../_api/storeRemove.api";
import { useEmitStoreRemove } from "../_vm/event/useEmitStoreRemove";

export const useStoreRemoveMutation = () => {
  const { storeRemoveEvent } = useEmitStoreRemove();
  const { isPending, isSuccess, mutateAsync } =
    storeRemoveApi.storeRemove.remove.useMutation({
      onSuccess: ({ id }) => {
        storeRemoveEvent(id);
      },
    });
  return {
    storeRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
