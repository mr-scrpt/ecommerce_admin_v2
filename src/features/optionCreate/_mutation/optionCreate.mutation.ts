import { useMutation } from "@tanstack/react-query";
import { optionCreateAction } from "../_action/optionCreate.action";
import { useEmitOptionCreate } from "../_vm/event/useEmitOptionCreate";

const baseKey = "optionCreateMutation";

export const useOptionCreateMutation = () => {
  const { optionCreateEvent } = useEmitOptionCreate();
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: optionCreateAction,
    onSuccess: async () => {
      optionCreateEvent();
    },
  });
  return {
    optionCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
