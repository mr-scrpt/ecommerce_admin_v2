import {
  DeliveryFormElements,
  useDeliveryByOrderIdQuery,
} from "@/entities/delivery";
import { useSettlementListSearchToSelectQuery } from "@/entities/settlement";
import { useStoreSettlementToSelectQuery } from "@/features/storeData";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import {
  DeliveryUpdateFormValues,
  deliveryUpdateFormSchema,
} from "../_domain/form.schema";
import { useDeliveryUpdate } from "../_vm/useDeliveryUpdate";
import { usePostOfficeListToSelectModel } from "@/entities/post";

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

  const { deliveryUpdate, isPending: isPendingUpdate } = useDeliveryUpdate();

  const { toSearch, settlementListToSelect } =
    useSettlementListSearchToSelectQuery(delivery?.settlement);

  const [selectedSettlement, setSelectedSettlement] = useState<string>("");

  useEffect(() => {
    if (delivery?.settlement) {
      setSelectedSettlement(delivery?.settlement);
    }
  }, [delivery]);

  const { postOfficeListToSelect, isPending: isPendingPostOfficeList } =
    usePostOfficeListToSelectModel(selectedSettlement);

  const { storeListToSelect } =
    useStoreSettlementToSelectQuery(selectedSettlement);

  const isPendingComplexible =
    isPendingUpdate ||
    isPendingDelivery ||
    !isFetchedAfterMount ||
    isPendingPostOfficeList;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!delivery) {
    return <div>Failed to load delivery, you may not have permissions</div>;
  }

  const handleSubmit = async (deliveryData: DeliveryUpdateFormValues) => {
    await deliveryUpdate({
      selector: { id: orderId },
      deliveryData,
    });

    onSuccess?.();

    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };
  // console.log(
  //   "output_log: postOfficeListToSelect =>>>",
  //   postOfficeListToSelect,
  // );

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
