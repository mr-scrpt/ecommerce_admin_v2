import { useMutation } from "@tanstack/react-query";
import { useEmitOptionRemove } from "..";
import { removeOptionComplexibleAction } from "../_action/optionRemoveComplexible.action";

const baseKey = "optionRemoveMutation";

export const useOptionRemoveMutation = () => {
  const { optionRemoveEvent } = useEmitOptionRemove();
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "complexible"],
    mutationFn: removeOptionComplexibleAction,
    onSuccess: async ({ option }) => {
      optionRemoveEvent(option.id);
    },
  });
  return {
    optionRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
