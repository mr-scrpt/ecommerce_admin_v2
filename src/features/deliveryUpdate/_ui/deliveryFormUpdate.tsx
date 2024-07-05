import { DeliveryFormElements, useDeliveryQuery } from "@/entities/delivery";
import { usePostOfficeListToSelectModel } from "@/entities/post";
import { useStoreListBySettltmentRefToSelectModel } from "@/entities/store";
import { Spinner } from "@/shared/ui/icons/spinner";
import { cn } from "@/shared/ui/utils";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import {
  DeliveryUpdateFormValues,
  deliveryUpdateFormSchema,
} from "../_domain/form.schema";
import { useDeliveryUpdateModel } from "../_vm/useDeliveryUpdate.model";
import { StoreSelectElement } from "@/entities/store/_ui/form/elements/storeSelectElement";
import { DeliveryUpdateFormElements } from "./form/deliveryUpdateFormElements";

interface OrderDeliveryFormProps extends HTMLAttributes<HTMLDivElement> {
  // orderId: string;
  deliveryId: string;
  callbackUrl?: string;
  className?: string;
  onSuccess?: () => void;
  // settlementRef?: string;
}

export const DeliveryFormUpdate: FC<OrderDeliveryFormProps> = (props) => {
  const {
    deliveryId,
    callbackUrl,
    className,
    // settlementRef = "",
    onSuccess,
  } = props;

  // const {
  //   isPending: isPendingDelivery,
  //   isFetchedAfterMount,
  //   delivery,
  // } = useDeliveryByOrderIdQuery(orderId);

  const {
    delivery,
    isPending: isPendingDelivery,
    isFetchedAfterMount,
  } = useDeliveryQuery(deliveryId);

  const router = useRouter();

  const { deliveryUpdate, isPending: isPendingUpdate } =
    useDeliveryUpdateModel();

  // const [selectedSettlement, setSelectedSettlement] = useState<string>("");
  //
  // useEffect(() => {
  //   if (settlementRef) {
  //     setSelectedSettlement(settlementRef);
  //   }
  // }, [settlementRef]);

  const handleSubmit = useCallback(
    async (deliveryData: DeliveryUpdateFormValues) => {
      console.log("output_log: data form =>>>", deliveryData);
      // TODO: add validation
      // if (!delivery) {
      //   return;
      // }
      // await deliveryUpdate({
      //   selector: { id: delivery.id },
      //   deliveryData,
      // });
      //
      // onSuccess?.();
      //
      // if (callbackUrl) {
      //   router.push(callbackUrl);
      // }
    },
    [callbackUrl, delivery, deliveryUpdate, onSuccess, router],
  );

  // const { postOfficeListToSelect, isPending: isPendingPostOfficeList } =
  //   usePostOfficeListToSelectModel(delivery?.settlementRef || "");
  //
  // const { storeListToSelect, isPending: isPendingStore } =
  //   useStoreListBySettltmentRefToSelectModel(settlementRef);

  const isPendingComplexible =
    isPendingUpdate || isPendingDelivery || !isFetchedAfterMount;
  // ||
  // isPendingStore ||
  // isPendingPostOfficeList;

  if (isPendingComplexible) {
    return <Spinner aria-label="Loading profile..." />;
  }

  if (!delivery) {
    return <div>Failed to load delivery, you may not have permissions</div>;
  }

  return (
    <div className={cn(className, "w-full")}>
      <DeliveryUpdateFormElements
        handleSubmit={handleSubmit}
        delivery={delivery}
        schema={deliveryUpdateFormSchema}
      >
        {/* <DeliveryUpdateFormElements.FieldCourier delivery={delivery} /> */}
        <DeliveryUpdateFormElements.FieldSettlementSelect />
        <DeliveryUpdateFormElements.FieldStoreSelect
        // settlementRef={settlementRef}
        // onSelectStore={console.log}
        />
        <DeliveryUpdateFormElements.SubmitButton
          isPending={isPendingComplexible}
          submitText="Save change"
        />
      </DeliveryUpdateFormElements>
      {/* <DeliveryFormElements */}
      {/*   handleSubmit={handleSubmit} */}
      {/*   delivery={delivery} */}
      {/*   schema={deliveryUpdateFormSchema} */}
      {/*   settlementRef={settlementRef} */}
      {/* > */}
      {/*   <DeliveryFormElements.FieldStreet /> */}
      {/*   <DeliveryFormElements.FieldHouse /> */}
      {/*   <DeliveryFormElements.SubmitButton */}
      {/*     isPending={isPendingComplexible} */}
      {/*     submitText="Save change" */}
      {/*   /> */}
      {/* </DeliveryFormElements> */}
    </div>
  );
};
