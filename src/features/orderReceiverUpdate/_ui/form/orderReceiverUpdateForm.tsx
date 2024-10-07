"use client";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import { orderReceiverUpdateFormSchema } from "../../_domain/form.schema";
import { useOrderReceiverUpdateValues } from "../../_vm/useOrderReceiverDefaultValues.model";
import { useOrderReceiverUpdateHandler } from "../../_vm/useOrderReceiverUpdate.handler";
import { OrderReceiverUpdateFormElements } from "./orderReceiverUpdateFormElements";

interface ReceiverUpdateFormProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  userId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const OrderReceiverUpdateForm: FC<ReceiverUpdateFormProps> = (props) => {
  const { orderId, userId, callbackUrl, className, onSuccess } = props;

  const {
    orderReceiverUpdateValues,
    isSuccessOrder,
    isAppearancePendingOrder,
    isFetchedAfterMountOrder,
  } = useOrderReceiverUpdateValues(orderId);

  const { handleOrderReceiverUpdate, isPendingUpdate } =
    useOrderReceiverUpdateHandler({
      selector: { orderId },
      onSuccess,
      callbackUrl,
    });

  if (isSuccessOrder || isAppearancePendingOrder) {
    return <Spinner aria-label="Loading profile..." />;
  }

  return (
    <div className={cn(className, "w-full")}>
      <OrderReceiverUpdateFormElements
        defaultValues={orderReceiverUpdateValues}
        handleSubmit={handleOrderReceiverUpdate}
        schema={orderReceiverUpdateFormSchema}
      >
        <OrderReceiverUpdateFormElements.FieldOrderReceiverSelect
          userId={userId}
        />
        <OrderReceiverUpdateFormElements.SubmitButton
          isPending={isPendingUpdate}
          submitText="Update Receiver"
        />
      </OrderReceiverUpdateFormElements>
    </div>
  );
};
