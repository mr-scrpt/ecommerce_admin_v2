import { ReactNode } from "react";
import { createStrictContext, useStrictContext } from "./react";

export type ModalParams = {
  title?: string;
  description?: string;
  element: ReactNode;
  // closeText?: string;
  // confirmText?: string;
};

export type ModalContext = {
  getModal: (params: ModalParams) => Promise<boolean>;
  closeModal: () => void;
};

export const modalContext = createStrictContext<ModalContext>();

export const useGetModal = () => {
  const { getModal } = useStrictContext(modalContext);

  return getModal;
};
