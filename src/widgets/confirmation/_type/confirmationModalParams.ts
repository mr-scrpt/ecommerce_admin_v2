export type ConfirmModalParams = {
  title: string;
  description: string;
  closeText: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
};
