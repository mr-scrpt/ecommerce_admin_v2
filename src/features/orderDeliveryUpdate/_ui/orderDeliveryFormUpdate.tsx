import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { FC, HTMLAttributes, useEffect } from "react";
import { useOrderDeliveryUpdate } from "../_vm/useOrderDeliveryUpdate";
import {
  DeliveryFormElements,
  useDeliveryByOrderIdQuery,
  useSettlementListSearchToSelectQuery,
} from "@/entities/delivery";
import { useRouter } from "next/navigation";
import {
  OrderDeliveryUpdateFormValues,
  orderDeliveryUpdateFormSchema,
} from "../_domain/form.schema";

interface OrderDeliveryFormProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const OrderDeliveryFormUpdate: FC<OrderDeliveryFormProps> = (props) => {
  const { orderId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingDelivery,
    isFetchedAfterMount,
    delivery,
  } = useDeliveryByOrderIdQuery(orderId);

  const router = useRouter();

  const { deliveryUpdate, isPending: isPendingUpdate } =
    useOrderDeliveryUpdate();

  const isPendingComplexible =
    isPendingUpdate || isPendingDelivery || !isFetchedAfterMount;

  const { toSearch, settlementListToSelect } =
    useSettlementListSearchToSelectQuery();

  useEffect(() => {
    toSearch("бров");
  }, []);

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!delivery) {
    return <div>Failed to load delivery, you may not have permissions</div>;
  }

  const handleSubmit = async (data: OrderDeliveryUpdateFormValues) => {
    await deliveryUpdate({
      deliveryId: delivery.id,
      data: {
        id: delivery.id,
        ...data,
      },
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  return (
    <div className={cn(className, "w-full")}>
      <DeliveryFormElements
        handleSubmit={handleSubmit}
        delivery={delivery}
        schema={orderDeliveryUpdateFormSchema}
      >
        <DeliveryFormElements.FieldCity
          settlementListToSelect={settlementListToSelect}
        />
        <DeliveryFormElements.FieldDeliveryType />
        {/* <DeliveryFormElements.FieldRole /> */}
        {/* <DeliveryFormElements.FieldEmailVerified /> */}
        {/* <DeliveryFormElements.FieldEmail /> */}
        {/* <DeliveryFormElements.FieldName /> */}
        {/* <DeliveryFormElements.FieldPhone /> */}
        {/* <DeliveryFormElements.FieldAvatar delivery={data.delivery} /> */}
        {/* <DeliveryFormElements.SubmitButton */}
        {/*   isPending={isPendingComplexible} */}
        {/*   submitText="Save change" */}
        {/* /> */}
      </DeliveryFormElements>
    </div>
  );
};