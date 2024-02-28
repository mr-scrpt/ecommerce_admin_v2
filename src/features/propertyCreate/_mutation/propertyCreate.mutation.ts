import { useMutation } from "@tanstack/react-query";
import { propertyCreateAction } from "../_action/propertyCreate.action";
import { useEmitPropertyCreate } from "../_vm/event/useEmitPropertyCreate";

const baseKey = "propertyCreateMutation";

export const usePropertyCreateMutation = () => {
  const { propertyCreateEvent } = useEmitPropertyCreate();
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: propertyCreateAction,
    onSuccess: async () => {
      propertyCreateEvent();
    },
  });
  return {
    propertyCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
