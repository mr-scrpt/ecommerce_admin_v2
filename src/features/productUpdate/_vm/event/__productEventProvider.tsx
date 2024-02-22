"use client";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { useEmitProductUpdate } from "./useEmitProductUpdate";
import { ProductId } from "@/entities/product";

export const productUpdateContext =
  createStrictContext<(productId: ProductId) => void>();

export function ProductEventProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { productUpdateEvent } = useEmitProductUpdate();
  return (
    <productUpdateContext.Provider value={productUpdateEvent}>
      {children}
    </productUpdateContext.Provider>
  );
}

export const useProductUpdateContext = () => {
  const useSelector = useStrictContext(productUpdateContext);
  return useSelector;
};
