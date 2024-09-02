"use client";
import {
  OrderRowFormElements,
  useOrderRowListIdByOrderModel,
} from "@/entities/order";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { useOrderRowCreateModel } from "../_vm/useOrderRowCreate.model";
import {
  OrderRowCreateFormValues,
  orderRowCreateFormSchema,
} from "../_domain/form.schema";
import { ProductFormElements } from "@/entities/product";

interface OrderRowFormCreateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string;
  className?: string;
  orderId: string;
  onSuccess?: () => void;
}

export const OrderRowFormCreate: FC<OrderRowFormCreateProps> = (props) => {
  const { callbackUrl, className, orderId, onSuccess } = props;

  const router = useRouter();

  const { orderRowCreate, isPending: isPendingCreate } =
    useOrderRowCreateModel();

  const { orderRowListId } = useOrderRowListIdByOrderModel(orderId);

  const handleSubmit = async (data: OrderRowCreateFormValues) => {
    const { product, quantity } = data;
    await orderRowCreate({
      selector: { orderId },
      orderRowData: { productId: product.value, quantity },
    });

    // TODO: Callback and redirect mb move to hook?
    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <OrderRowFormElements<OrderRowCreateFormValues>
        handleSubmit={handleSubmit}
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
