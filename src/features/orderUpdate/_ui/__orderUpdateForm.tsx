import { OrderFormElements } from "@/entities/order";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes } from "react";
import { OrderUpdateFormValues } from "../_domain/form.schema";
import { useOrderDefaultValues } from "../_vm/useOrderDefaultValues.model";
import { useOrderWithRelationModel } from "@/entities/order";

interface OrderUpdateFromProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const OrderUpdateForm: FC<OrderUpdateFromProps> = (props) => {
  const { orderId, className, callbackUrl, onSuccess } = props;

  const { order, isSuccess, isPending } = useOrderWithRelationModel(orderId);

  const router = useRouter();

  const defaultValues = useOrderDefaultValues(order);
  const handleSubmit = async (data: OrderUpdateFormValues) => {
    // const { propertyList, ...categoryData } = data;
    await orderUpdate({
      selector: { id: orderId },
      orderData: data,
      // propertyData: propertyList.map(({ value }) => ({ propertyId: value })),
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <OrderFormElements
      defaultValues={defaultValues}
      handleSubmit={handleSubmit}
    >
      <OrderFormElements.FieldOrderStatusStateSelect />
      <OrderFormElements.FieldOrderStatusPaymentSelect />
      {/* <ProductFormElements.FieldProductSelectGroupSearch */}
      {/*   productInOrder={ */}
      {/*     order?.orderRowList.map(({ productId }) => productId) ?? [] */}
      {/*   } */}
      {/* /> */}
    </OrderFormElements>
  );
};
