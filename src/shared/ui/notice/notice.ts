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

  errorMessage.forEach((item) => {
    toast({
      variant: "destructive",
      title: item,
    });
  });
};

export const buildSuccessNotice = (message: string) => {
  toast({
    variant: "default",
    title: message,
  });
};

// interface NoticeProps extends HTMLAttributes<HTMLDivElement> {}

// export const notice = (props: Toast) => {
//   const { className: skipClass, ...rest } = props;
//   // const className =
//   //   "text-dark100_light900 dark:border-light-700 dark:bg-dark-300 border-light-700 bg-light-900";
//   // return toast({ className, ...rest });
//   return toast(props);
// };

// export const noticeError = (props: Toast) => {
//   const { variant, ...rest } = props;
//   return toast({ variant: "destructive", ...rest });
// };
