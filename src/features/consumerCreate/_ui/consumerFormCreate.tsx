import { ConsumerFormElements } from "@/entities/consumer";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import {
  ConsumerCreateFormValues,
  consumerCreateFormSchema,
} from "../_domain/form.schema";
import { ConsumerCreateForm } from "../_domain/ui.type";
import { useRouter } from "next/navigation";

interface ConsumerCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
  onConsumerCreate: (consumerData: ConsumerCreateForm) => void;
  isPending: boolean;
}

export const ConsumerFormCreate: FC<ConsumerCreateFormProps> = (props) => {
  const { className, onConsumerCreate, onSuccess, callbackUrl, isPending } =
    props;

  const router = useRouter();

  const handleSubmit = async (consumerData: ConsumerCreateFormValues) => {
    onConsumerCreate({ consumerData });

    onSuccess?.();
    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <ConsumerFormElements<ConsumerCreateFormValues>
        handleSubmit={handleSubmit}
        schema={consumerCreateFormSchema}
      >
        <ConsumerFormElements.FieldEmail />
        <ConsumerFormElements.FieldName />
        <ConsumerFormElements.FieldLastName />
        <ConsumerFormElements.FieldPhone />
        <ConsumerFormElements.FieldConsumerSelectSearch />
        <ConsumerFormElements.SubmitButton
          isPending={isPending}
          submitText="Create consumer"
        />
      </ConsumerFormElements>
    </div>
  );
};
