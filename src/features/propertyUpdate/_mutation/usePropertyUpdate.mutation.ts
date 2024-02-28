import { useMutation } from "@tanstack/react-query";
import { updatePropertyAction } from "../_action/propertyUpdate.action";
import { useEmitPropertyUpdate } from "../_vm/event/useEmitPropertyUpdate";

const baseKey = "propertyUpdateMutation";

export const usePropertyUpdateMutation = () => {
  const { propertyUpdateEvent } = useEmitPropertyUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updatePropertyAction,
    onSuccess: async ({ property }) => {
      propertyUpdateEvent(property.id);
    },
  });
  return {
    propertyUpdate: mutateAsync,
    isPending,
  };
};
