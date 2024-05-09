"use client";
import { FC, HTMLAttributes, useState } from "react";
import { Modal } from "@/shared/ui/modal";
import { ModalProviderParams } from "../_type/modalProviderParams";
import { ModalParams, modalContext } from "@/shared/lib/modal";

interface ModalWindowProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalProvider: FC<ModalWindowProps> = (props) => {
  const { children } = props;
  const [modalParams, setModalParams] = useState<ModalProviderParams>();

  const getModal = (params: ModalParams) => {
    return new Promise<boolean>((resolve) => {
      setModalParams({
        ...params,

        onConfirm: () => {
          setModalParams(undefined);
          resolve(true);
        },
        onClose: () => {
          setModalParams(undefined);
          resolve(false);
        },
      });
    });
  };

  const closeModal = () => {
    setModalParams(undefined);
  };

  return (
    <modalContext.Provider
      value={{
        getModal,
        closeModal,
      }}
    >
      {children}

      {modalParams && <Modal params={modalParams} />}
    </modalContext.Provider>
  );
};
