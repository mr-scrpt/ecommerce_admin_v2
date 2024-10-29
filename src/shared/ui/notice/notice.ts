import { ReactNode } from "react";
import { ToastActionElement, ToastProps } from "../toast";
import { toast } from "../use-toast";

type ToasterToast = ToastProps & {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
};

type Toast = Omit<ToasterToast, "id">;

export const buildErrorNotice = (message: string) => {
  try {
    console.log("output_log: MESSAGE =>>>", message);
    const errorMessage: Array<string> = JSON.parse(message);

    errorMessage.forEach((item, index) => {
      setTimeout(() => {
        toast({
          variant: "destructive",
          title: item,
        });
      }, index * 300);
    });
  } catch (e) {
    console.log("output_log: ERROR =>>>", e);
  }
};

export const buildSuccessNotice = (message: string) => {
  toast({
    variant: "default",
    title: message,
  });
};
