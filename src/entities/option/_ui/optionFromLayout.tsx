import { FC, HTMLAttributes } from "react";
import { Option } from "../_domain/types";
import { OptionFormValues } from "../_domain/option/option.schema";
import { OptionForm } from "./optionForm";
import { Separator } from "@/shared/ui/separator";

interface OptionFromLayoutProps extends HTMLAttributes<HTMLDivElement> {
  option?: Option;
  handleSubmit?: (data: OptionFormValues) => void;
  isPending: boolean;
  submitText?: string;
}

export const OptionFromLayout: FC<OptionFromLayoutProps> = (props) => {
  const { option, handleSubmit, submitText, isPending } = props;
  console.log("output_log:  =>>>", submitText, isPending);

  return (
    <OptionForm
      isPending={isPending}
      option={option}
      submitText={submitText}
      handleSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex w-full">
        <OptionForm.FieldOption />
      </div>
      <Separator />
      <div className="flex w-full">
        <OptionForm.FieldOptionsItem />
      </div>
      <div className="flex w-full">
        <OptionForm.SubmitButton />
      </div>
    </OptionForm>
  );
};
