"use client";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { useEmitCategoryUpdate } from "./useEmitCategoryUpdate";

export const categoryUpdateContext =
  createStrictContext<(categoryId: string) => void>();

export function CategoryEventProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { categoryUpdateEvent } = useEmitCategoryUpdate();
  return (
    <categoryUpdateContext.Provider value={categoryUpdateEvent}>
      {children}
    </categoryUpdateContext.Provider>
  );
}

export const useCategoryUpdateContext = () => {
  const useSelector = useStrictContext(categoryUpdateContext);
  return useSelector;
};
