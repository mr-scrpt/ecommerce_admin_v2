import { useMutation } from "@tanstack/react-query";
import { useEmitPropertyRemove } from "..";
import { removePropertyComplexibleAction } from "../_action/propertyRemoveComplexible.action";

const baseKey = "propertyRemoveMutation";

export const usePropertyRemoveMutation = () => {
  const { propertyRemoveEvent } = useEmitPropertyRemove();
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "complexible"],
    mutationFn: removePropertyComplexibleAction,
    onSuccess: async ({ property }) => {
      propertyRemoveEvent(property.id);
    },
  });
  return {
    propertyRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
