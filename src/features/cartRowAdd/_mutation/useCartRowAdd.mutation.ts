"use client";

import { cartRowAddApi } from "../_api/cartRowAdd.api";
import { useEmitCartUpdate } from "../_vm/event/useEmitCartRowUpdate";

export const useCartRowAddMutation = () => {
  const { cartUpdateEvent } = useEmitCartUpdate();

  const { mutateAsync, isPending } = cartRowAddApi.cartRowAdd.add.useMutation({
    onSuccess: async ({ id }) => {
      cartUpdateEvent(id);
    },
  });
  return {
    cartRowAdd: mutateAsync,
    isPending,
  };
};
