"use client";
import {
  ReceiverFormDefaultValues,
  ReceiverFormElements,
} from "@/entities/receiver";
import { FC, HTMLAttributes } from "react";

interface ReceiverCreateFormLayoutProps
  extends HTMLAttributes<HTMLFormElement> {
  handleSubmit: (data: ReceiverFormDefaultValues) => void;
  toSearch: (q: string) => void;
  isPending: boolean;
  submitText: string;
}

export const ReceiverCreateFormLayout: FC<ReceiverCreateFormLayoutProps> = (
  props,
) => {
  const { handleSubmit, isPending, submitText } = props;

  return (
    <ReceiverFormElements handleSubmit={handleSubmit}>
      <ReceiverFormElements.FieldName />
      <ReceiverFormElements.FieldLastName />
      <ReceiverFormElements.FieldPhone />
      <ReceiverFormElements.SubmitButton
        isPending={isPending}
        submitText={submitText}
      />
    </ReceiverFormElements>
  );
};
