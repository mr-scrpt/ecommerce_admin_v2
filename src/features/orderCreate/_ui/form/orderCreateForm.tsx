"use client";
import { ConsumerFormElements } from "@/entities/consumer";
import { OrderFormElements } from "@/entities/order";
import { useConsumerCreateModal } from "@/kernel/domain/consumer/consumer.provider";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { orderCreateFormSchema } from "../../_domain/form.schema";
import { useOrderCreateHandler } from "../../_vm/useOrderCreate.handler";

interface OrderCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: string;
  className?: string;
  onSuccess?: () => void;
}

export const OrderCreateForm: FC<OrderCreateFormProps> = (props) => {
  const { callbackUrl, className, onSuccess } = props;

  const { handleOrderCreate, isPendingCreate, isSuccessCreate } =
    useOrderCreateHandler(callbackUrl, onSuccess);

  const { consumerCreateModal } = useConsumerCreateModal();

  const openCreateConsumerModal = (e: React.MouseEvent) => {
    e.preventDefault();
    consumerCreateModal();
  };

  return (
    <div className={cn(className, "w-full")}>
      <ConsumerFormElements
        handleSubmit={handleOrderCreate}
        schema={orderCreateFormSchema}
        className="flex flex-row flex-wrap gap-4"
      >
        <ConsumerFormElements.FieldConsumerSelectSearch className="grow" />
        <Button className="ml-auto mr-0" onClick={openCreateConsumerModal}>
          Add Consumer
        </Button>
        <div className="w-full">
          <OrderFormElements.SubmitButton
            isPending={isPendingCreate}
            submitText="Create Order"
            // className=""
          />
        </div>
      </ConsumerFormElements>
    </div>
  );
};
