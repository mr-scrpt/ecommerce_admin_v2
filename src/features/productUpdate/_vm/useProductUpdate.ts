// "use client";
import { ProductEntity } from "@/entities/product";
import { useProductUpdateMutation } from "../_mutation/useProductUpdate.mutation";
import { useEmitProductUpdate } from "./event/useEmitProductUpdate";

export const useProductUpdate = () => {
  const { productUpdateEvent } = useEmitProductUpdate();

  const onSuccess = async (product: ProductEntity) => {
    const { id } = product;
    productUpdateEvent(id);
  };

  const { mutateAsync, isPending } = useProductUpdateMutation({ onSuccess });

  return {
    productUpdate: mutateAsync,
    isPending,
  };
};
