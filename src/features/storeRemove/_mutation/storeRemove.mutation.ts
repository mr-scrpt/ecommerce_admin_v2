import { useMutation } from "@tanstack/react-query";
import { removeStoreComplexibleAction } from "../_action/storeRemoveComplexible.action";
import { useEmitStoreRemove } from "../_vm/event/useEmitStoreRemove";

const baseKey = "storeRemoveMutation";

export const useStoreRemoveMutation = () => {
  const { storeRemoveEvent } = useEmitStoreRemove();
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "complexible"],
    mutationFn: removeStoreComplexibleAction,
    onSuccess: ({ store }) => {
      storeRemoveEvent(store.id);
    },
  });
  return {
    storeRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
