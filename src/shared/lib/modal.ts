import { ReactNode } from "react";
import { createStrictContext, useStrictContext } from "./react";

export type ModalParams = {
  title?: string;
  description?: string;
  element: ReactNode;
};

export type ModalContext = {
  getModal: (params: ModalParams) => Promise<boolean>;
  closeModal: () => void;
};

export const modalContext = createStrictContext<ModalContext>();

export const useModalGet = () => {
  const { getModal } = useStrictContext(modalContext);

  return getModal;
};

export const useModalClose = () => {
  const { closeModal } = useStrictContext(modalContext);

  return closeModal;
};

export const useModalControl = () => {
  const { getModal, closeModal } = useStrictContext(modalContext);

  return { getModal, closeModal };
};
