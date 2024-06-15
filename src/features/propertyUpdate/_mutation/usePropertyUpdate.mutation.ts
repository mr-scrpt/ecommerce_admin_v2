import { useEmitPropertyUpdate } from "../_vm/event/useEmitPropertyUpdate";
import { propertyUpdateApi } from "../_api/propertyUpdate.api";

export const usePropertyUpdateMutation = () => {
  const { propertyUpdateEvent } = useEmitPropertyUpdate();

  const { mutateAsync, isPending } =
    propertyUpdateApi.propertyUpdate.update.useMutation({
      onSuccess: async ({ id }) => {
        propertyUpdateEvent(id);
      },
    });
  return {
    propertyUpdate: mutateAsync,
    isPending,
  };
};
