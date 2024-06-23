import {
  DeliveryFormElements,
  useDeliveryByOrderIdQuery,
} from "@/entities/delivery";
import {
  useSettlementListSearchToSelectQuery,
  useSettlemetListToSelect,
} from "@/entities/settlement";
// import { useStoreSettlementToSelectQuery } from "@/features/storeData";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback, useEffect, useState } from "react";
import {
  DeliveryUpdateFormValues,
  deliveryUpdateFormSchema,
} from "../_domain/form.schema";
import { useDeliveryUpdateModel } from "../_vm/useDeliveryUpdate.model";
import { usePostOfficeListToSelectModel } from "@/entities/post";
import { useStoreListBySettltmentRefToSelectModel } from "@/entities/store";

interface OrderDeliveryFormProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
}

export const DeliveryFormUpdate: FC<OrderDeliveryFormProps> = (props) => {
  const { orderId, callbackUrl, className, onSuccess } = props;

  const {
    isPending: isPendingDelivery,
    isFetchedAfterMount,
    delivery,
  } = useDeliveryByOrderIdQuery(orderId);

  const router = useRouter();

  const { deliveryUpdate, isPending: isPendingUpdate } =
    useDeliveryUpdateModel();

  const { toSearch, settlementListToSelect } = useSettlemetListToSelect(
    delivery?.settlement,
  );

  const [selectedSettlement, setSelectedSettlement] = useState<string>("");

  useEffect(() => {
    if (delivery?.settlement) {
      setSelectedSettlement(delivery?.settlement);
    }
  }, [delivery]);

  const handleSubmit = useCallback(
    async (deliveryData: DeliveryUpdateFormValues) => {
      if (!delivery) {
        return;
      }
      await deliveryUpdate({
        selector: { id: delivery.id },
        deliveryData,
      });

      onSuccess?.();

      if (callbackUrl) {
        router.push(callbackUrl);
      }
    },
    [callbackUrl, delivery, deliveryUpdate, onSuccess, router],
  );

  const { postOfficeListToSelect, isPending: isPendingPostOfficeList } =
    usePostOfficeListToSelectModel(selectedSettlement);

  const { storeListToSelect, isPending: isPendingStore } =
    useStoreListBySettltmentRefToSelectModel(selectedSettlement);

  const isPendingComplexible =
    isPendingUpdate ||
    isPendingDelivery ||
    !isFetchedAfterMount ||
    isPendingStore ||
    isPendingPostOfficeList;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!delivery) {
    return <div>Failed to load delivery, you may not have permissions</div>;
  }

  return (
    <div className={cn(className, "w-full")}>
      <DeliveryFormElements
        handleSubmit={handleSubmit}
        delivery={delivery}
        schema={deliveryUpdateFormSchema}
      >
        <DeliveryFormElements.FieldSettlement
          settlementListToSelect={settlementListToSelect}
          toSearch={toSearch}
          handleSelect={setSelectedSettlement}
        />
        <DeliveryFormElements.FieldDeliveryType
          postOfficeListToSelect={postOfficeListToSelect}
          storeListToSelect={storeListToSelect}
        />
        {/* TODO: Получатель */}

        {/* <DeliveryFormElements.FieldRole /> */}
        {/* <DeliveryFormElements.FieldEmailVerified /> */}
        {/* <DeliveryFormElements.FieldEmail /> */}
        {/* <DeliveryFormElements.FieldName /> */}
        {/* <DeliveryFormElements.FieldPhone /> */}
        {/* <DeliveryFormElements.FieldAvatar delivery={data.delivery} /> */}
        <DeliveryFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </DeliveryFormElements>
    </div>
  );
};
