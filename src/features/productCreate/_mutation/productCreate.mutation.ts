import { useMutation } from "@tanstack/react-query";
import { productCreateAction } from "../_action/productCreate.action";
import { useEmitProductCreate } from "../_vm/event/useEmitProductCreate";

const baseKey = "productCreateMutation";

export const useProductCreateMutation = () => {
  const { productCreateEvent } = useEmitProductCreate();
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey],
    mutationFn: productCreateAction,
    onSuccess: async () => {
      productCreateEvent();
    },
  });
  return {
    productCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
