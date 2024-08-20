import { FC } from "react";
export type ButtonSubmitType = {
  isPending: boolean;
  submitText: string;
  className?: string;
};
export type ButtonSubmitComponentType = FC<ButtonSubmitType>;
