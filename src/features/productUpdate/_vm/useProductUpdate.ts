// "use client";
import { ProductEntity } from "@/entities/product/_domain/types";
import { useProductUpdateMutation } from "../_mutation/useProductUpdate.mutation";
import { useEmitProductUpdate } from "./event/useEmitProductUpdate";
import { useAppSession } from "@/entities/user/session";

export const useProductUpdate = () => {
  const { update: updateSession } = useAppSession();

  // const invalidateProduct = useInvalidateProduct();

  const { productUpdateEvent } = useEmitProductUpdate();

  const onSuccess = async (product: ProductEntity) => {
    const { id } = product;
    // await invalidateProduct(id);
    await updateSession({
      product,
    });
    productUpdateEvent(id);
  };

  const { mutateAsync, isPending } = useProductUpdateMutation({ onSuccess });

  return {
    // productUpdateEvent,
    productUpdate: mutateAsync,
    isPending,
  };
};
