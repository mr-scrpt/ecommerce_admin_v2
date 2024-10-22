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
  const errorMessage: Array<string> = JSON.parse(message);
  console.log("output_log: ERRor message =>>>", errorMessage);

  errorMessage.forEach((item, index) => {
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: item,
      });
    }, index * 300);
  });
};

export const buildSuccessNotice = (message: string) => {
  toast({
    variant: "default",
    title: message,
  });
};
