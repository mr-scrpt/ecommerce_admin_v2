// "use client";
import { ProductEntity } from "@/entities/product";
import { useProductUpdateMutation } from "../_mutation/useProductUpdate.mutation";
import { useEmitProductUpdate } from "./event/useEmitProductUpdate";

export const useProductUpdate = () => {
  // const { update: updateSession } = useAppSession();

  const { productUpdateEvent } = useEmitProductUpdate();

  const onSuccess = async (product: ProductEntity) => {
    const { id } = product;
    console.log("output_log: revalidate product id =>>>", id);
    // await invalidateProduct(id);
    // await updateSession({
    //   product,
    // });
    productUpdateEvent(id);
  };

  const { mutateAsync, isPending } = useProductUpdateMutation({ onSuccess });

  return {
    // productUpdateEvent,
    productUpdate: mutateAsync,
    isPending,
  };
};
