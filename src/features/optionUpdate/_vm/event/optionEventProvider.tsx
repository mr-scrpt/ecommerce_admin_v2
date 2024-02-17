"use client";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { useEmitOptionUpdate } from "./useEmitOptionUpdate";
import { OptionId } from "@/entities/option";

export const optionUpdateContext =
  createStrictContext<(optionId: OptionId) => void>();

export function OptionEventProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { optionUpdateEvent } = useEmitOptionUpdate();
  return (
    <optionUpdateContext.Provider value={optionUpdateEvent}>
      {children}
    </optionUpdateContext.Provider>
  );
}

export const useOptionUpdateContext = () => {
  const useSelector = useStrictContext(optionUpdateContext);
  return useSelector;
};
