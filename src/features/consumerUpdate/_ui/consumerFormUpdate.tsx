import { ConsumerFormElements, useConsumerModel } from "@/entities/consumer";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import {
  ConsumerUpdateFormValues,
  consumerUpdateFormSchema,
} from "../_domain/form.schema";
import { useConsumerDefaultValues } from "../_vm/useConsumerDefaultValues.model";
import { useConsumerUpdateModel } from "../_vm/useConsumerUpdate.model";

interface ConsumerFormProps extends HTMLAttributes<HTMLDivElement> {
  consumerId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const ConsumerFormUpdate: FC<ConsumerFormProps> = (props) => {
  const { consumerId, callbackUrl, className, onSuccess } = props;

  const { isAppearancePendingConsumer, isFetchedAfterMountConsumer, consumer } =
    useConsumerModel(consumerId);

  const router = useRouter();

  const { consumerUpdate, isPending: isPendingUpdate } =
    useConsumerUpdateModel();

  const defaultValues = useConsumerDefaultValues(consumer);

  const isPendingComplexible =
    isPendingUpdate ||
    isAppearancePendingConsumer ||
    !isFetchedAfterMountConsumer;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!consumer) {
    return <div>Failed to load consumer, you may not have permissions</div>;
  }

  const handleSubmit = async (consumerData: ConsumerUpdateFormValues) => {
    await consumerUpdate({
      selector: { id: consumerId },
      consumerData,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <ConsumerFormElements
        defaultValues={defaultValues}
        handleSubmit={handleSubmit}
        schema={consumerUpdateFormSchema}
      >
        <ConsumerFormElements.FieldEmail />
        <ConsumerFormElements.FieldName />
        <ConsumerFormElements.FieldLastName />
        <ConsumerFormElements.FieldPhone />
        {/* <ConsumerFormElements.FieldAvatar consumer={data.consumer} /> */}
        <ConsumerFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </ConsumerFormElements>
    </div>
  );
};
