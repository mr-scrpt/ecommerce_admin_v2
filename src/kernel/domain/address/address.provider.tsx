"use client";
import { AddressCreateProps } from "./ui.type";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { HTMLAttributes } from "react";

export interface AddressCreateModalProviderProps
  extends HTMLAttributes<HTMLDivElement> {
  addressAddModal: (props: AddressCreateProps) => void;
}
const AddressCreateModalContext =
  createStrictContext<AddressCreateModalProviderProps>();

export const AddressCreateModalProvider = (
  props: AddressCreateModalProviderProps,
) => {
  const { addressAddModal, children } = props;
  return (
    <AddressCreateModalContext.Provider value={{ addressAddModal }}>
      {children}
    </AddressCreateModalContext.Provider>
  );
};

export const useAddressAddModal = () => {
  const { addressAddModal } = useStrictContext(AddressCreateModalContext);
  return {
    addressAddModal,
  };
};
