import { useEmitPropertyRemove } from "..";
import { propertyRemoveApi } from "../_api/propertyRemove.api";

export const usePropertyRemoveMutation = () => {
  const { propertyRemoveEvent } = useEmitPropertyRemove();
  const { isPending, isSuccess, mutateAsync } =
    propertyRemoveApi.propertyRemove.remove.useMutation({
      onSuccess: async ({ id }) => {
        propertyRemoveEvent(id);
      },
    });
  return {
    propertyRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
