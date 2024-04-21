"use client";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Spinner } from "@/shared/ui/icons/spinner";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, HTMLAttributes, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ZodTypeAny } from "zod";
import { Delivery } from "../_domain/delivery.types";
import {
  DeliveryFormDefaultValues,
  deliveryFormDefaultSchema,
} from "../_domain/form.schema";
import { DeliveryTypeRadio } from "./formField/deliveryTypeRadio";
import { SettleToSelect } from "@/entities/settlement";
import { DeliverySettlementSelect } from "./formField/deliverySettlementSelect";

interface DeliveryFormElementsProps extends HTMLAttributes<HTMLFormElement> {
  delivery: Delivery;
  handleSubmit: (data: DeliveryFormDefaultValues) => void;
  schema?: ZodTypeAny;
}

interface DeliverySubmitFieldProps {
  isPending?: boolean;
  submitText: string;
  className?: string;
}

type DeliveryFormElementsType = FC<DeliveryFormElementsProps> & {
  FieldDeliveryType: FC<{}>;
  FieldSettlement: FC<{
    settlementListToSelect: SettleToSelect[];
    toSearch: (q: string) => void;
  }>;
  FieldStreet: FC<{}>;
  FieldHouse: FC<{}>;
  FieldApartment: FC<{}>;
  FieldPostOffice: FC<{}>;
  FieldPickupPoint: FC<{}>;
  SubmitButton: FC<DeliverySubmitFieldProps>;
};

const getDefaultValues = (delivery: Delivery) => ({
  deliveryType: delivery.deliveryType,
  settlement: delivery.settlement,
  street: delivery.street ?? "",
  house: delivery.house ?? "",
  apartment: delivery.apartment ?? "",
  postOffice: delivery.postOffice ?? "",
  pickupPoint: delivery.pickupPoint ?? "",
});

export const DeliveryFormElements: DeliveryFormElementsType = (props) => {
  const { delivery, handleSubmit: onSubmit, schema, children } = props;

  const form = useForm<DeliveryFormDefaultValues>({
    resolver: zodResolver(schema ?? deliveryFormDefaultSchema),
    defaultValues: getDefaultValues(delivery),
  });

  useEffect(() => {
    form.reset(getDefaultValues(delivery));
  }, [delivery, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    onSubmit(data);
  });

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

DeliveryFormElements.FieldDeliveryType = function FieldDeliveryType() {
  return <DeliveryTypeRadio />;
};

DeliveryFormElements.FieldSettlement = function FieldSettlement(props) {
  const { settlementListToSelect, toSearch } = props;
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="settlement"
      // defaultValue="0e834da5-4b3a-11e4-ab6d-005056801329"
      render={({ field }) => (
        <DeliverySettlementSelect
          control={control}
          className="w-full"
          name="settlement"
          citiesList={settlementListToSelect}
          isPending={false}
          toSearch={toSearch}
          // handleSelect={(value: string)=>console.log(value)}
          field={field}
        />
      )}
    />
  );
  // return (
  //   <FormField
  //     control={control}
  //     name="settlement"
  //     render={({ field }) => (
  //       <FormItem>
  //         <FormLabel>Settlement</FormLabel>
  //         <FormControl>
  //           <Input placeholder="" {...field} />
  //         </FormControl>
  //         <FormMessage />
  //       </FormItem>
  //     )}
  //   />
  // );
};

DeliveryFormElements.FieldStreet = function FieldStreet() {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="street"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Street</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DeliveryFormElements.FieldHouse = function FieldHouse() {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="house"
      render={({ field }) => (
        <FormItem>
          <FormLabel>House</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DeliveryFormElements.FieldApartment = function FieldApartment() {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="apartment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Apartment</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DeliveryFormElements.FieldPostOffice = function FieldPostOffice() {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="postOffice"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Post office</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DeliveryFormElements.FieldPickupPoint = function FieldPickupPoint() {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="pickupPoint"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pickup point</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DeliveryFormElements.SubmitButton = function SubmitButton(props) {
  const { isPending, submitText } = props;
  return (
    <Button type="submit" disabled={isPending}>
      {isPending && (
        <Spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-label="Delivery updating..."
        />
      )}
      {submitText}
    </Button>
  );
};
