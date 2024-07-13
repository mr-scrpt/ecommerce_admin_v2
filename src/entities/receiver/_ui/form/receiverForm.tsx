import { Receiver } from "@/kernel/domain/receiver/receiver.type";
import { FC, HTMLAttributes } from "react";
import { ReceiverFormElements } from "./elements/receiverFormElements";
import { ReceiverFormDefaultValues } from "../../_domain/form.schema";

interface ReceiverFormProps
  extends Omit<HTMLAttributes<HTMLFormElement>, "handleSubmit"> {
  receiverData?: Receiver;
  handleSubmit: (data: ReceiverFormDefaultValues) => void;
  isPending: boolean;
  submitText: string;
}

export const ReceiverForm: FC<ReceiverFormProps> = (props) => {
  const { receiverData, isPending, submitText, handleSubmit } = props;
  return (
    <ReceiverFormElements
      handleSubmit={handleSubmit}
      receiverData={receiverData}
    >
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
