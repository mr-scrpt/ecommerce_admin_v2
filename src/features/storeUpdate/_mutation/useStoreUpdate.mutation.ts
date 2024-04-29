import { useMutation } from "@tanstack/react-query";
import { updateStoreAction } from "../_action/storeUpdate.action";
import { useEmitStoreUpdate } from "../_vm/event/useEmitStoreUpdate";

const baseKey = "storeUpdateMutation";

export const useStoreUpdateMutation = () => {
  const { storeUpdateEvent } = useEmitStoreUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateStoreAction,
    onSuccess: async ({ store }) => {
      storeUpdateEvent(store.id);
    },
  });
  return {
    storeUpdate: mutateAsync,
    isPending,
  };
};
