"use client";
import { AddressCreateProps } from "./ui.type";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { HTMLAttributes } from "react";

export interface AddressCreateModalProviderProps
  extends HTMLAttributes<HTMLDivElement> {
  addressCreateModal: (props: AddressCreateProps) => void;
}
const AddressCreateModalContext =
  createStrictContext<AddressCreateModalProviderProps>();

export const AddressCreateModalProvider = (
  props: AddressCreateModalProviderProps,
) => {
  const { addressCreateModal, children } = props;
  return (
    <AddressCreateModalContext.Provider value={{ addressCreateModal }}>
      {children}
    </AddressCreateModalContext.Provider>
  );
};

export const useAddressCreateModal = () => {
  const { addressCreateModal } = useStrictContext(AddressCreateModalContext);
  return {
    addressCreateModal,
  };
};
