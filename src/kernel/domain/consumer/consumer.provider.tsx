"use client";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { HTMLAttributes } from "react";

export interface ConsumerCreateModalProviderProps
  extends HTMLAttributes<HTMLDivElement> {
  consumerCreateModal: () => void;
}
const ConsumerCreateModalContext =
  createStrictContext<ConsumerCreateModalProviderProps>();

export const ConsumerCreateModalProvider = (
  props: ConsumerCreateModalProviderProps,
) => {
  const { consumerCreateModal, children } = props;
  return (
    <ConsumerCreateModalContext.Provider value={{ consumerCreateModal }}>
      {children}
    </ConsumerCreateModalContext.Provider>
  );
};

export const useConsumerCreateModal = () => {
  const { consumerCreateModal } = useStrictContext(ConsumerCreateModalContext);
  return {
    consumerCreateModal,
  };
};
