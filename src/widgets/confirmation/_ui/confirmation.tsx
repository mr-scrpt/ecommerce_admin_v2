import { FC, HTMLAttributes, useState } from "react";
import { ConfirmModalParams } from "../_type/confirmationModalParams";
import {
  ConfirmationParams,
  confirmationContext,
} from "@/shared/lib/confirmation";
import { confirmationParamsDefault } from "../_constant/confirmationParamsDefault";
import { Modal } from "@/shared/ui/modal";

interface ConfirmationProps extends HTMLAttributes<HTMLDivElement> {}

export const Confirmation: FC<ConfirmationProps> = (props) => {
  const { children } = props;
  const [modalParams, setModalParams] = useState<ConfirmModalParams>();

  const closeConfirmation = () => {
    modalParams?.onClose();
  };

  const getConfirmation = (params: ConfirmationParams) => {
    return new Promise<boolean>((resolve) => {
      setModalParams({
        ...confirmationParamsDefault,
        ...params,

        onConfirm: () => {
          setModalParams(undefined);
          resolve(true);
        },
        onClose: () => {
          closeConfirmation();
          setModalParams(undefined);
          resolve(false);
        },
      });
    });
  };

  return (
    <confirmationContext.Provider
      value={{
        getConfirmation,
        closeConfirmation,
      }}
    >
      {children}

      {modalParams && <Modal params={modalParams} />}
    </confirmationContext.Provider>
  );
};
