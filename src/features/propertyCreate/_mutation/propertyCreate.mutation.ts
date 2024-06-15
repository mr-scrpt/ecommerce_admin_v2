import { propertyCreateApi } from "../_api/propertyCreate.api";
import { useEmitPropertyCreate } from "../_vm/event/useEmitPropertyCreate";

export const usePropertyCreateMutation = () => {
  const { propertyCreateEvent } = useEmitPropertyCreate();
  const { isPending, isSuccess, mutateAsync } =
    propertyCreateApi.propertyCreate.create.useMutation({
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
