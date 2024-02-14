import { useProductCreateMutation } from "../_mutation/productCreate.mutation";
import { useEmitProductCreate } from "./event/useEmitProductCreate";

export const useProductCreate = () => {
  const { productCreateEvent } = useEmitProductCreate();

  const onSuccess = async () => {
    productCreateEvent();
  };

  const { mutateAsync, isPending, isSuccess } = useProductCreateMutation({
    onSuccess,
  });

  return {
    productCreate: mutateAsync,
    isPending,
    isSuccess,
  };
};
