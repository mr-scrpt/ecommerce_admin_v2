import { ConsumerFormElements } from "@/entities/consumer";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import {
  ConsumerCreateFormValues,
  consumerCreateFormSchema,
} from "../_domain/form.schema";
import { useConsumerCreateHandler } from "../_vm/useConsumerCreate.handler";

interface ConsumerCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const ConsumerCreateForm: FC<ConsumerCreateFormProps> = (props) => {
  const { className, onSuccess } = props;

  const { handleConsumerCreate, isPendingCreate } = useConsumerCreateHandler({
    onSuccess,
  });

  return (
    <div className={cn(className, "w-full")}>
      <ConsumerFormElements<ConsumerCreateFormValues>
        handleSubmit={handleConsumerCreate}
        schema={consumerCreateFormSchema}
      >
        <ConsumerFormElements.FieldEmail />
        <ConsumerFormElements.FieldName />
        <ConsumerFormElements.FieldLastName />
        <ConsumerFormElements.FieldPhone />
        {/* <ConsumerFormElements.FieldConsumerSelectSearch /> */}
        <ConsumerFormElements.SubmitButton
          isPending={isPendingCreate}
          submitText="Create consumer"
        />
      </ConsumerFormElements>
    </div>
  );
};
