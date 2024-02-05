import { ConfirmModalParams } from "../_type/confirmationModalParams";

export const confirmationParamsDefault: ConfirmModalParams = {
  title: "Confirm action",
  description: "Are you sure you want to continue?",
  closeText: "Cancel",
  confirmText: "Confirm",
  onClose: () => {},
  onConfirm: () => {},
};
