import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { FC, HTMLAttributes, ReactNode, memo } from "react";
import { Button } from "./button";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  params: {
    title?: string;
    description?: string;
    element?: ReactNode;
    closeText?: string;
    confirmText?: string;
    onClose: () => void;
    onConfirm: () => void;
  };
}

export const Modal: FC<ModalProps> = memo((props) => {
  const { params, children } = props;
  const {
    title,
    description,
    closeText,
    confirmText,
    onClose,
    onConfirm,
    element,
  } = params;

  return (
    <Dialog open={!!params} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>{element}</div>

        <DialogFooter>
          {closeText && (
            <Button variant="destructive" onClick={onClose}>
              {closeText}
            </Button>
          )}
          {confirmText && (
            <Button variant="secondary" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

Modal.displayName = "Modal";
