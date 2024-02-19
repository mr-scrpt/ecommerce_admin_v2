import { Separator } from "@/shared/ui/separator";
import { FC, HTMLAttributes } from "react";
import { OptionFormValues } from "../_domain/option/option.schema";
import { OptionRelation } from "../_domain/types";
import { OptionForm } from "./optionForm";

interface OptionFromLayoutProps extends HTMLAttributes<HTMLDivElement> {
  option?: OptionRelation;
  handleSubmit?: (data: OptionFormValues) => void;
  isPending: boolean;
  submitText?: string;
}

export const OptionFromLayout: FC<OptionFromLayoutProps> = (props) => {
  const { option, handleSubmit, submitText, isPending } = props;

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
