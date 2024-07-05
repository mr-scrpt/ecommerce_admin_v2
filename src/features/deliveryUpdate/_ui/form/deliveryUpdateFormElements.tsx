import { DeliveryFormElements } from "@/entities/delivery";
import { SettlementSelectElement } from "@/entities/settlement";
import { StoreSelectElement } from "@/entities/store";
import { Delivery } from "@/kernel/domain/delivery/delivery.type";
import { Form, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  DeliveryUpdateFormValues,
  deliveryUpdateFormSchema,
} from "../../_domain/form.schema";

export interface DeliveryFormElementsProps
  extends HTMLAttributes<HTMLFormElement> {
  delivery: Delivery;
  handleSubmit: (data: DeliveryUpdateFormValues) => void;
  schema?: ZodTypeAny;
}

export interface DeliveryFormElementsFields {
  FieldStoreSelect: FC;
  FieldSettlementSelect: FC;
  FieldCourier: FC;
  SubmitButton: FC<DeliverySubmitFieldProps>;
}

interface IDeliveryFormElements
  extends FC<DeliveryFormElementsProps>,
    DeliveryFormElementsFields {}

const getDefaultValues = (delivery: Delivery) => ({
  settlementRef: delivery.settlementRef ?? "",
  street: delivery.street ?? "",
  house: delivery.house ?? "",
  apartment: delivery.apartment ?? "",
  postOffice: delivery.postOffice ?? "",
  store: delivery.store ?? "",
});

export const DeliveryUpdateFormElements: IDeliveryFormElements = (props) => {
  const { delivery, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<DeliveryUpdateFormValues>({
    resolver: zodResolver(deliveryUpdateFormSchema),
    defaultValues: getDefaultValues(delivery),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit?.(data);
  });

  console.log("output_log:  =>>>", form.formState);

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

DeliveryUpdateFormElements.FieldSettlementSelect =
  function FieldSettlementSelect() {
    const { control } = useFormContext<DeliveryUpdateFormValues>();
    return (
      <FormField
        control={control}
        name="settlementRef"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Select settlement</FormLabel>
            <SettlementSelectElement
              settlementActive={field.value}
              onSelectSettlement={field.onChange}
            />
          </FormItem>
        )}
      />
    );
  };

DeliveryUpdateFormElements.FieldStoreSelect = function FieldStoreSelect() {
  const { control } = useFormContext<DeliveryUpdateFormValues>();
  const { settlementRef } = control._formValues;
  return (
    <FormField
      control={control}
      name="store"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Select settlement</FormLabel>
          <StoreSelectElement
            onSelectStore={field.onChange}
            settlementRef={settlementRef}
            storeInit={field.value}
          />
        </FormItem>
      )}
    />
  );
};

DeliveryUpdateFormElements.FieldCourier = function FieldCourier() {
  // return (
  //   <DeliveryFormElements delivery={delivery} onChange={console.log}>
  //     <DeliveryFormElements.FieldStreet />
  //     <DeliveryFormElements.FieldHouse />
  //     <DeliveryFormElements.FieldApartment />
  //   </DeliveryFormElements>
  // );
};

interface DeliverySubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

DeliveryUpdateFormElements.SubmitButton = DeliveryFormElements.SubmitButton;

// DeliveryUpdateFormElements.FieldDeliveryType = function FieldDeliveryType(
//   props,
// ) {
//   const { customText } = props;
//   return <div>Delivery Type {customText}</div>;
// };
//
// DeliveryUpdateFormElements.FieldPostOffice = function FieldPostOffice(props) {
//   return <div>Post Office</div>;
// };
//
// DeliveryUpdateFormElements.FieldPickupPoint = function FieldPickupPoint(props) {
//   const { settlementRef, onSelectStore } = props;
//   const { control } = useFormContext<DeliveryFormDefaultValues>();
//   return (
//     <FormField
//       control={control}
//       name="store"
//       render={({ field }) => (
//         <StoreSelectElement
//           onSelectStore={field.onChange}
//           settlementRef={settlementRef}
//           storeInit={field.value}
//         />
//       )}
//     />
//   );
// };
//
// export default DeliveryUpdateFormElements;
