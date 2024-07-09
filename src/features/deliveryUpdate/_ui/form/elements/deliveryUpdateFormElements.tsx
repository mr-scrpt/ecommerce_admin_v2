import { DeliveryFormElements } from "@/entities/delivery";
import { SettlementSelectElement } from "@/entities/settlement";
import { StoreSelectElement } from "@/entities/store";
import {
  Delivery,
  DeliveryTypeEnum,
} from "@/kernel/domain/delivery/delivery.type";
import { Form, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import {
  DeliveryUpdateFormValues,
  deliveryUpdateFormSchema,
} from "../../../_domain/form.schema";
import { AddressHouseElement, AddressStreetElement } from "@/entities/address";
import { PostSelectElement } from "@/entities/post/_ui/form/elements/postSelectElement";
import { DeliveryTypeField } from "../fields/deliveryTypeField";

export interface DeliveryFormElementsProps
  extends HTMLAttributes<HTMLFormElement> {
  delivery: Delivery;
  handleSubmit: (data: DeliveryUpdateFormValues) => void;
  schema?: ZodTypeAny;
}

export interface DeliveryFormElementsFields {
  FieldDeliveryType: FC;
  FieldSettlementSelect: FC;
  FieldPostSelect: FC;
  FieldStoreSelect: FC;
  FieldStreet: FC;
  FieldHouse: FC;
  FieldApartment: FC;
  SubmitButton: FC<DeliverySubmitFieldProps>;
}

interface IDeliveryFormElements
  extends FC<DeliveryFormElementsProps>,
    DeliveryFormElementsFields {}

const getDefaultValues = (delivery: Delivery) => ({
  deliveryType: delivery.deliveryType ?? DeliveryTypeEnum.POST,
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

  console.log("output_log: form values =>>>", form.getValues());

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

DeliveryUpdateFormElements.FieldDeliveryType = function FieldDeliveryType() {
  return <DeliveryTypeField />;
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

DeliveryUpdateFormElements.FieldPostSelect = function FieldPostSelect() {
  const { control } = useFormContext<DeliveryUpdateFormValues>();
  const { settlementRef } = control._formValues;
  return (
    <FormField
      control={control}
      name="postOffice"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Select post</FormLabel>
          <PostSelectElement
            onSelectPost={field.onChange}
            settlementRef={settlementRef}
            postInit={field.value}
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

DeliveryUpdateFormElements.FieldStreet = function FieldStreet() {
  const { control } = useFormContext<DeliveryUpdateFormValues>();
  return (
    <FormField
      control={control}
      name="street"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Enter street</FormLabel>
          <AddressStreetElement onChange={field.onChange} />
        </FormItem>
      )}
    />
  );
};

DeliveryUpdateFormElements.FieldHouse = function FieldHouse() {
  const { control } = useFormContext<DeliveryUpdateFormValues>();
  return (
    <FormField
      control={control}
      name="house"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Enter house</FormLabel>
          <AddressHouseElement onChange={field.onChange} />
        </FormItem>
      )}
    />
  );
};

DeliveryUpdateFormElements.FieldApartment = function FieldApartment() {
  const { control } = useFormContext<DeliveryUpdateFormValues>();
  return (
    <FormField
      control={control}
      name="apartment"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Select apartment</FormLabel>
          <AddressStreetElement onChange={field.onChange} />
        </FormItem>
      )}
    />
  );
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
