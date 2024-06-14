import { useMutation } from "@tanstack/react-query";
import { useEmitPropertyCreate } from "../_vm/event/useEmitPropertyCreate";
import { propertyCreateApi } from "../_api/propertyCreate.api";

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
