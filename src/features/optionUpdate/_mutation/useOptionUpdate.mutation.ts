import { useMutation } from "@tanstack/react-query";
import { updateOptionAction } from "../_action/optionUpdate.action";
import { useEmitOptionUpdate } from "../_vm/event/useEmitOptionUpdate";

const baseKey = "optionUpdateMutation";

export const useOptionUpdateMutation = () => {
  const { optionUpdateEvent } = useEmitOptionUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateOptionAction,
    onSuccess: async ({ option }) => {
      optionUpdateEvent(option.id);
    },
  });
  return {
    optionUpdate: mutateAsync,
    isPending,
  };
};
