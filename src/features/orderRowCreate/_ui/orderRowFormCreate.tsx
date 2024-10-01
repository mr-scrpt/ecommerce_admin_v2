"use client";
import {
  OrderRowFormElements,
  useOrderRowListProductIdByOrderModel,
} from "@/entities/order";
import { ProductFormElements } from "@/entities/product";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes } from "react";
import {
  OrderRowCreateFormValues,
  orderRowCreateFormSchema,
} from "../_domain/form.schema";
import { useOrderRowCreateHandler } from "../_vm/useOrderRowCreate.handler";

interface OrderRowFormCreateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  orderId: string;
  onSuccess?: () => void;
}

export const OrderRowFormCreate: FC<OrderRowFormCreateProps> = (props) => {
  const { callbackUrl, className, orderId, onSuccess } = props;
  const { handleOrderRowCreate, isSuccessCreate, isPendingCreate } =
    useOrderRowCreateHandler({ data: { orderId }, onSuccess, callbackUrl });

  const { orderRowListId } = useOrderRowListProductIdByOrderModel(orderId);

  return (
    <div className={cn(className, "w-full")}>
      <OrderRowFormElements<OrderRowCreateFormValues>
        handleSubmit={handleOrderRowCreate}
        schema={orderRowCreateFormSchema}
      >
        <ProductFormElements.FieldProductSelectGroupSearch
          productInOrder={orderRowListId}
        />
        <OrderRowFormElements.FieldOrderRowQuantity />
        <OrderRowFormElements.SubmitButton
          isPending={isPendingCreate}
          submitText="Create OrderRow"
        />
      </OrderRowFormElements>
    </div>
  );
};
