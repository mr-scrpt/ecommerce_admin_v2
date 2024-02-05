import { ReactNode } from "react";

export type ModalProviderParams = {
  element: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
};
